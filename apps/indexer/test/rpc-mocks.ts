import { http, HttpResponse } from "msw";

export const TEST_RPC_URL = "http://localhost:9999/soroban/rpc";

interface JsonRpcRequestBody {
  jsonrpc: string;
  id: number;
  method: string;
  params?: unknown;
}

type MethodHandlers = Record<string, (params: unknown) => unknown>;

/** Mocks the single JSON-RPC endpoint, dispatching by request body `method`. */
export function mockJsonRpc(methodHandlers: MethodHandlers) {
  return http.post(TEST_RPC_URL, async ({ request }) => {
    const body = (await request.json()) as JsonRpcRequestBody;
    const handler = methodHandlers[body.method];

    if (!handler) {
      return HttpResponse.json({
        jsonrpc: "2.0",
        id: body.id,
        error: { code: -32601, message: `unmocked method: ${body.method}` }
      });
    }

    return HttpResponse.json({
      jsonrpc: "2.0",
      id: body.id,
      result: handler(body.params)
    });
  });
}
