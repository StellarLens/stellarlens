import { rpc } from "@stellar/stellar-sdk";
import { createDb } from "@stellarlens/db";
import { POLL_INTERVAL_MS, SOROBAN_RPC_URL } from "./config.js";
import { processEventsBatch } from "./events.js";
import { startRegistryServer } from "./server.js";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const server = new rpc.Server(SOROBAN_RPC_URL);
  const db = createDb();

  startRegistryServer(db);

  for (;;) {
    try {
      const count = await processEventsBatch(db, server);
      if (count > 0) {
        console.log(`indexed ${count} event(s)`);
      }
    } catch (err) {
      console.error("failed to process events batch:", err);
    }
    await sleep(POLL_INTERVAL_MS);
  }
}

main();
