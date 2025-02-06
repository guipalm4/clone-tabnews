import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllService();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toBeDefined();
      expect(responseBody).toHaveProperty("updated_at");

      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      const databaseInfo = responseBody.dependencies.database;

      expect(databaseInfo.version).toEqual("16.3");
      expect(databaseInfo.max_connections).toEqual(100);
      expect(databaseInfo.opened_connections).toEqual(1);
    });
  });
});
