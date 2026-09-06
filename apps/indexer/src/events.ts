import { eq } from "drizzle-orm";
import type { rpc } from "@stellar/stellar-sdk";
import { contracts, events as eventsTable, indexerCheckpoints, type Database } from "@stellarlens/db";
import { EVENTS_BATCH_LIMIT, STELLAR_NETWORK } from "./config.js";
import { decodeScVal } from "./decode.js";
import { withRetry } from "./retry.js";

type Tx = Parameters<Parameters<Database["transaction"]>[0]>[0];

async function getStoredCursor(db: Database): Promise<string | undefined> {
  const [row] = await db
    .select({ cursor: indexerCheckpoints.cursor })
    .from(indexerCheckpoints)
    .where(eq(indexerCheckpoints.network, STELLAR_NETWORK));
  return row?.cursor;
}

async function resolveContractId(tx: Tx, address: string): Promise<number> {
  const [row] = await tx
    .insert(contracts)
    .values({ address, network: STELLAR_NETWORK })
    .onConflictDoUpdate({
      target: contracts.address,
      set: { network: STELLAR_NETWORK }
    })
    .returning({ id: contracts.id });
  return row.id;
}

export async function processEventsBatch(db: Database, server: rpc.Server): Promise<number> {
  const cursor = await getStoredCursor(db);

  const request = cursor
    ? { filters: [{ type: "contract" as const }], cursor, limit: EVENTS_BATCH_LIMIT }
    : {
        filters: [{ type: "contract" as const }],
        startLedger: (await withRetry("getLatestLedger", () => server.getLatestLedger())).sequence,
        limit: EVENTS_BATCH_LIMIT
      };

  const response = await withRetry("getEvents", () => server._getEvents(request));

  await db.transaction(async (tx) => {
    for (const event of response.events) {
      const contractId = await resolveContractId(tx, event.contractId);

      const rawTopic = event.topic ?? [];
      const decodedTopic = rawTopic.map(decodeScVal);
      const decodedValue = decodeScVal(event.value);

      await tx.insert(eventsTable).values({
        contractId,
        ledger: event.ledger,
        txHash: event.txHash,
        topic: JSON.stringify(rawTopic),
        decodedData: {
          id: event.id,
          type: event.type,
          ledgerClosedAt: event.ledgerClosedAt,
          inSuccessfulContractCall: event.inSuccessfulContractCall,
          raw: {
            topic: rawTopic,
            value: event.value
          },
          decoded: {
            topic: decodedTopic,
            value: decodedValue
          }
        }
      });
    }

    await tx
      .insert(indexerCheckpoints)
      .values({ network: STELLAR_NETWORK, cursor: response.cursor })
      .onConflictDoUpdate({
        target: indexerCheckpoints.network,
        set: { cursor: response.cursor }
      });
  });

  return response.events.length;
}
