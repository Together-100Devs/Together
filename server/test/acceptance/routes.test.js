const request = require("supertest");
require("dotenv").config({ path: "../../config/.env" });
const app = require("../../app");
const {
  validFormDataNonRecurr,
  validFormDataRecurr,
  missingTitle,
} = require("../unit/validateBodyMockData");

const { Database } = require("../utils");

describe("event routes", () => {
  const testDb = new Database();

  beforeEach(async () => {
    await testDb.setUp();
  });

  afterEach(async () => {
    await testDb.tearDown();
  });

  describe("GET /events", function () {
    it("should return empty array when there are no events", async () => {
      const res = await request(app).get("/events");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(0);
    });
  });

  describe("POST /events", () => {
    it("should create non-recurring event", async () => {
      const res = await request(app)
        .post("/events")
        .send(validFormDataNonRecurr);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Event created!");
      expect(res.body.events).toHaveLength(1);
    });

    it("should create recurring event", async () => {
      const res = await request(app).post("/events").send(validFormDataRecurr);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Event created!");
      expect(res.body.events).toHaveLength(6);
    });
  });
});
