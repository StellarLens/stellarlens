import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { createApiKey } from "./helpers";
import { getApp, getTestDb } from "./setup";

describe("contracts (e2e)", () => {
  let apiKey: string;

  beforeEach(async () => {
    apiKey = await createApiKey(getTestDb());
  });

  it("registers a new contract", async () => {
    const response = await request(getApp().getHttpServer())
      .post("/contracts")
      .set("x-api-key", apiKey)
      .send({ address: "CONTRACT_REGISTER_A", network: "testnet", name: "My Contract" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      address: "CONTRACT_REGISTER_A",
      network: "testnet",
      name: "My Contract"
    });
    expect(response.body.id).toBeDefined();
  });

  it("persists the registered contract, retrievable by id", async () => {
    const registerResponse = await request(getApp().getHttpServer())
      .post("/contracts")
      .set("x-api-key", apiKey)
      .send({ address: "CONTRACT_REGISTER_B", network: "testnet" });

    const contractId = registerResponse.body.id;

    const getResponse = await request(getApp().getHttpServer())
      .get(`/contracts/${contractId}`)
      .set("x-api-key", apiKey);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toMatchObject({ id: contractId, address: "CONTRACT_REGISTER_B" });
  });

  it("upserts on re-registering the same address", async () => {
    await request(getApp().getHttpServer())
      .post("/contracts")
      .set("x-api-key", apiKey)
      .send({ address: "CONTRACT_REGISTER_C", network: "testnet", name: "Original" });

    const updateResponse = await request(getApp().getHttpServer())
      .post("/contracts")
      .set("x-api-key", apiKey)
      .send({ address: "CONTRACT_REGISTER_C", network: "testnet", name: "Renamed" });

    expect(updateResponse.status).toBe(201);
    expect(updateResponse.body.name).toBe("Renamed");

    const listResponse = await request(getApp().getHttpServer()).get("/contracts").set("x-api-key", apiKey);
    expect(listResponse.body).toHaveLength(1);
  });

  it("returns 404 for an unknown contract id", async () => {
    const response = await request(getApp().getHttpServer()).get("/contracts/999999").set("x-api-key", apiKey);
    expect(response.status).toBe(404);
  });
});
