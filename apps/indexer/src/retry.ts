import { MAX_RETRIES, RETRY_BASE_DELAY_MS, RETRY_MAX_DELAY_MS } from "./config.js";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(label: string, fn: () => Promise<T>): Promise<T> {
  let attempt = 0;

  for (;;) {
    try {
      return await fn();
    } catch (err) {
      attempt += 1;
      if (attempt > MAX_RETRIES) {
        throw err;
      }
      const delay = Math.min(RETRY_BASE_DELAY_MS * 2 ** (attempt - 1), RETRY_MAX_DELAY_MS);
      console.error(
        `${label} failed (attempt ${attempt}/${MAX_RETRIES}), retrying in ${delay}ms:`,
        err
      );
      await sleep(delay);
    }
  }
}
