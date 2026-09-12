import "dotenv/config";
import { createDb, users } from "@stellarlens/db";
import { hashPassword } from "../lib/password";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password) {
    console.error("usage: pnpm create-user <email> <password>");
    process.exit(1);
  }

  const db = createDb();
  const passwordHash = await hashPassword(password);
  await db.insert(users).values({ email: email.toLowerCase(), passwordHash });
  console.log(`created user ${email}`);
  process.exit(0);
}

main();
