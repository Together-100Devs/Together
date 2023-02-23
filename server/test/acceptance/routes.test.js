const request = require("supertest");
const app = require("../../app");
const {
  validFormDataNonRecurr,
  validFormDataRecurr,
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

    it("should return an array of events if they exist", async () => {
      const resPost = await request(app)
        .post("/events")
        .send(validFormDataNonRecurr);
      expect(resPost.statusCode).toBe(201);

      const res = await request(app).get("/events");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(1);
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

  describe("DELETE /events/:id", () => {
    it("should delete event if it exists and return 204 on success", async () => {
      // Create an event
      const resPost = await request(app)
        .post("/events")
        .send(validFormDataNonRecurr);
      expect(resPost.statusCode).toBe(201);

      // Delete event
      const { _id } = resPost.body.events[0];
      const resDel = await request(app).delete(`/events/${_id}`);
      expect(resDel.statusCode).toBe(204);

      // Check if deleted
      const resGet = await request(app).get("/events");
      expect(resGet.body).toHaveLength(0);
    });

    it("should return 404 if event is not found", async () => {
      const _id = "63c722239b1a9104e164d728";
      const resDel = await request(app).delete(`/events/${_id}`);
      expect(resDel.statusCode).toBe(404);
    });
  });

  describe("DELETE /events/deleteAllEvents/:groupId", () => {
    it("should return 404 if no events found", async () => {
      const groupId = "1234";
      const resDel = await request(app).delete(
        `/events/deleteAllEvents/${groupId}`
      );
      expect(resDel.statusCode).toBe(404);
    });

    it("should delete events if they exist and return 204 on success", async () => {
      // Create an event
      const resPost = await request(app)
        .post("/events")
        .send(validFormDataRecurr);
      expect(resPost.statusCode).toBe(201);

      // Delete event
      const { groupId } = resPost.body.events[0];
      const resDel = await request(app).delete(
        `/events/deleteAllEvents/${groupId}`
      );
      expect(resDel.statusCode).toBe(204);

      // Check if deleted
      const resGet = await request(app).get("/events");
      expect(resGet.body).toHaveLength(0);
    });
  });
});
