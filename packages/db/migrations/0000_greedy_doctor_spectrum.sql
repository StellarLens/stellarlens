CREATE TABLE "contracts" (
	"id" serial PRIMARY KEY NOT NULL,
	"address" text NOT NULL,
	"name" text,
	"network" text NOT NULL,
	CONSTRAINT "contracts_address_unique" UNIQUE("address")
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"contract_id" integer NOT NULL,
	"ledger" bigint NOT NULL,
	"tx_hash" text NOT NULL,
	"topic" text NOT NULL,
	"decoded_data" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "token_transfers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"contract_id" integer NOT NULL,
	"from" text NOT NULL,
	"to" text NOT NULL,
	"amount" numeric NOT NULL,
	"asset" text NOT NULL,
	"tx_hash" text NOT NULL,
	"ledger" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "indexer_checkpoints" (
	"network" text PRIMARY KEY NOT NULL,
	"cursor" bigint NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "token_transfers" ADD CONSTRAINT "token_transfers_contract_id_contracts_id_fk" FOREIGN KEY ("contract_id") REFERENCES "public"."contracts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "events_contract_id_idx" ON "events" USING btree ("contract_id");--> statement-breakpoint
CREATE INDEX "events_ledger_idx" ON "events" USING btree ("ledger");--> statement-breakpoint
CREATE INDEX "events_tx_hash_idx" ON "events" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "token_transfers_contract_id_idx" ON "token_transfers" USING btree ("contract_id");--> statement-breakpoint
CREATE INDEX "token_transfers_tx_hash_idx" ON "token_transfers" USING btree ("tx_hash");--> statement-breakpoint
CREATE INDEX "token_transfers_ledger_idx" ON "token_transfers" USING btree ("ledger");