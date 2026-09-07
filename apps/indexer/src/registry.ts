import { eq } from "drizzle-orm";
import { contracts, type Database } from "@stellarlens/db";

export interface ContractRegistration {
  address: string;
  name?: string;
  network: string;
}

export async function registerContract(db: Database, registration: ContractRegistration) {
  const [row] = await db
    .insert(contracts)
    .values({
      address: registration.address,
      name: registration.name ?? null,
      network: registration.network
    })
    .onConflictDoUpdate({
      target: contracts.address,
      set: {
        name: registration.name ?? null,
        network: registration.network
      }
    })
    .returning();
  return row;
}

/** Maps registered contract address -> internal id, scoped to one network. */
export async function loadRegisteredContracts(db: Database, network: string): Promise<Map<string, number>> {
  const rows = await db
    .select({ id: contracts.id, address: contracts.address })
    .from(contracts)
    .where(eq(contracts.network, network));
  return new Map(rows.map((row) => [row.address, row.id]));
}
