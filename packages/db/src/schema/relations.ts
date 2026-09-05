import { relations } from "drizzle-orm";
import { contracts } from "./contracts.js";
import { events } from "./events.js";
import { tokenTransfers } from "./tokenTransfers.js";

export const contractsRelations = relations(contracts, ({ many }) => ({
  events: many(events),
  tokenTransfers: many(tokenTransfers)
}));

export const eventsRelations = relations(events, ({ one }) => ({
  contract: one(contracts, {
    fields: [events.contractId],
    references: [contracts.id]
  })
}));

export const tokenTransfersRelations = relations(tokenTransfers, ({ one }) => ({
  contract: one(contracts, {
    fields: [tokenTransfers.contractId],
    references: [contracts.id]
  })
}));
