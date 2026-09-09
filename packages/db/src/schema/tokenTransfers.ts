import { bigint, bigserial, index, integer, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { contracts } from "./contracts.js";

export const tokenTransfers = pgTable(
  "token_transfers",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    contractId: integer("contract_id")
      .notNull()
      .references(() => contracts.id),
    from: text("from").notNull(),
    to: text("to").notNull(),
    amount: numeric("amount").notNull(),
    asset: text("asset").notNull(),
    txHash: text("tx_hash").notNull(),
    ledger: bigint("ledger", { mode: "number" }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull()
  },
  (table) => [
    index("token_transfers_contract_id_idx").on(table.contractId),
    index("token_transfers_tx_hash_idx").on(table.txHash),
    index("token_transfers_ledger_idx").on(table.ledger)
  ]
);
