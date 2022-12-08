const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

async function run() {
  const dbPath = path.join(__dirname, '..', '.mongo');

  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
  }

  // start mongo
  const mongod = await MongoMemoryServer.create({
    instance: {
      port: 27017,
      dbPath,
      // to persist data between runs (https://github.com/nodkz/mongodb-memory-server/issues/524)
      storageEngine: 'wiredTiger',
    },
  });

  const uri = mongod.getUri();
  console.log(`Mongo server started on: ${uri}`);
}

run()
