/**
 * Recognizes SEP-41 `transfer` events: topics are `["transfer", from: Address, to: Address]`.
 * Real-world tokens don't reliably include a separate asset-code topic, so the emitting
 * contract's own address is used as the asset identifier.
 */
export interface DetectedTransfer {
  from: string;
  to: string;
  amount: string;
}

export function detectTransfer(decodedTopic: unknown[], decodedValue: unknown): DetectedTransfer | undefined {
  if (
    decodedTopic.length < 3 ||
    decodedTopic[0] !== "transfer" ||
    typeof decodedTopic[1] !== "string" ||
    typeof decodedTopic[2] !== "string"
  ) {
    return undefined;
  }

  const amount = extractAmount(decodedValue);
  if (amount === undefined) {
    return undefined;
  }

  return { from: decodedTopic[1], to: decodedTopic[2], amount };
}

// Plain transfers carry an i128 amount as `value`; muxed transfers carry
// `{ amount, to_muxed_id }` instead.
function extractAmount(decodedValue: unknown): string | undefined {
  if (typeof decodedValue === "string") {
    return decodedValue;
  }
  if (decodedValue && typeof decodedValue === "object" && "amount" in decodedValue) {
    const amount = (decodedValue as { amount: unknown }).amount;
    return typeof amount === "string" ? amount : undefined;
  }
  return undefined;
}
