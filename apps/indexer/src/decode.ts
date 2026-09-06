import { scValToNative, xdr } from "@stellar/stellar-sdk";

function toJsonSafe(value: unknown): unknown {
  if (typeof value === "bigint") {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.map(toJsonSafe);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, val]) => [key, toJsonSafe(val)])
    );
  }
  return value;
}

export function decodeScVal(base64Xdr: string): unknown {
  const scVal = xdr.ScVal.fromXdr(base64Xdr, "base64");
  return toJsonSafe(scValToNative(scVal));
}
