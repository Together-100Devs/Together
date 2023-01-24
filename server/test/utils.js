"use strict";

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

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

module.exports = { Database };
