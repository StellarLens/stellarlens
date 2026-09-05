import { pgTable, text } from "drizzle-orm/pg-core";

export const indexerCheckpoints = pgTable("indexer_checkpoints", {
  network: text("network").primaryKey(),
  cursor: text("cursor").notNull()
});
