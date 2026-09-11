import { createHash, randomBytes } from "node:crypto";
import { apiKeys, type Database } from "@stellarlens/db";

export async function createApiKey(db: Database): Promise<string> {
  const rawKey = randomBytes(24).toString("hex");
  const keyHash = createHash("sha256").update(rawKey).digest("hex");
  await db.insert(apiKeys).values({ keyHash });
  return rawKey;
}
