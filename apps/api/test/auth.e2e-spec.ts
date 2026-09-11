import { apiKeys } from "@stellarlens/db";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApiKey } from "./helpers";
import { getApp, getTestDb } from "./setup";

describe("api key auth (e2e)", () => {
  it("allows the public health check without an api key", async () => {
    const response = await request(getApp().getHttpServer()).get("/health");
    expect(response.status).toBe(200);
  });

  it("rejects requests with no x-api-key header", async () => {
    const response = await request(getApp().getHttpServer()).get("/contracts");
    expect(response.status).toBe(401);
  });

  it("rejects requests with an api key that doesn't match any hash", async () => {
    const response = await request(getApp().getHttpServer()).get("/contracts").set("x-api-key", "not-a-real-key");
    expect(response.status).toBe(401);
  });

  it("rejects a revoked api key", async () => {
    const db = getTestDb();
    const apiKey = await createApiKey(db);
    await db.update(apiKeys).set({ revokedAt: new Date() });

    const response = await request(getApp().getHttpServer()).get("/contracts").set("x-api-key", apiKey);
    expect(response.status).toBe(401);
  });

  it("accepts a valid, non-revoked api key", async () => {
    const apiKey = await createApiKey(getTestDb());
    const response = await request(getApp().getHttpServer()).get("/contracts").set("x-api-key", apiKey);
    expect(response.status).toBe(200);
  });
});
