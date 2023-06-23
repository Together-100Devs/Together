"use strict";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const app = require("../app");

class Database {
  async setUp() {
    try {
      this.mongod = await MongoMemoryServer.create();
      const url = this.mongod.getUri();
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      });
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  async tearDown() {
    try {
      await mongoose.connection.dropDatabase();
      await mongoose.disconnect();
      await this.mongod.stop();
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

/*
 * A simple higher-order function to run test code as a guest (non-authenticated user).
 *
 * @param {Function} callback - The code block to execute.
 * @param {Object} [agent=null] - The request agent to use.
 * @returns {Promise} - Resolves with the return value of the callback.
 */
async function asGuest(callback, agent = null) {
  try {
    process.env.MOCK_USER = "false";

    if (agent) {
      await request.agent(app).get("/auth/logout");
    }

    return await callback();
  } finally {
    process.env.MOCK_USER = "true";
  }
}

module.exports = {
  Database,
  asGuest,
};
