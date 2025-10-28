import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.CONNECTION_STRING;
const db_name = process.env.DB_NAME;

let client;
let isConnected = false;

async function connect() {
  if (!isConnected) {
    client = new MongoClient(uri);
    await client.connect();
    isConnected = true;
    console.log("Connected to MongoDB");
  }
  return client;
}

async function getDb(dbName = db_name) {
  const client = await connect();
  return client.db(dbName);
}

async function closeConnection() {
  if (isConnected) {
    await client.close();
    isConnected = false;
  }
}

// Graceful shutdown handler
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

export { getDb, closeConnection };
