import "dotenv/config";
import { rpc } from "@stellar/stellar-sdk";

const SOROBAN_RPC_URL = process.env.SOROBAN_RPC_URL;

if (!SOROBAN_RPC_URL) {
  throw new Error("SOROBAN_RPC_URL environment variable is required");
}

const POLL_INTERVAL_MS = 5000;

const server = new rpc.Server(SOROBAN_RPC_URL);

async function pollLatestLedger() {
  const { sequence } = await server.getLatestLedger();
  console.log(`latest ledger: ${sequence}`);
}

async function main() {
  for (;;) {
    try {
      await pollLatestLedger();
    } catch (err) {
      console.error("failed to fetch latest ledger:", err);
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
  }
}

main();
