CREATE TABLE "api_keys" (
	"id" serial PRIMARY KEY NOT NULL,
	"key_hash" text NOT NULL,
	"name" text,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "api_keys_key_hash_unique" UNIQUE("key_hash")
);
