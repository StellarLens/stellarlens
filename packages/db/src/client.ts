import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export function createDb(connectionString: string = process.env.DATABASE_URL!) {
  const client = postgres(connectionString);
  return drizzle(client);
}

export type Database = ReturnType<typeof createDb>;
