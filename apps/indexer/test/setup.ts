import "dotenv/config";
import { sql } from "drizzle-orm";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll } from "vitest";
import { createDb, type Database } from "@stellarlens/db";

export const mswServer = setupServer();

let db: Database;

export function getTestDb(): Database {
  return db;
}

beforeAll(async () => {
  db = createDb();
  await migrate(db, { migrationsFolder: "../../packages/db/migrations" });
  mswServer.listen({ onUnhandledRequest: "error" });
});

afterEach(async () => {
  await db.execute(
    sql`TRUNCATE TABLE token_transfers, events, indexer_checkpoints, contracts RESTART IDENTITY CASCADE`
  );
  mswServer.resetHandlers();
});

afterAll(() => {
  mswServer.close();
});
