import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.CONNECTION_STRING;
const db_name = process.env.DB_NAME;

// Conexión global que se reutiliza
let client = null;
let db = null;

async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(uri, {
      // Configuración para pool de conexiones
      maxPoolSize: 10, // Número máximo de conexiones en el pool
      minPoolSize: 5,  // Número mínimo de conexiones en el pool
      maxIdleTimeMS: 30000, // Tiempo máximo que una conexión puede estar idle
      serverSelectionTimeoutMS: 5000, // Timeout para seleccionar servidor
      socketTimeoutMS: 45000, // Timeout para operaciones
    });

    await client.connect();
    db = client.db(db_name);
    
    console.log("Conectado a MongoDB con Connection Pooling");
    return { client, db };
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw error;
  }
}

// Función principal para obtener la base de datos
async function getDb() {
  if (!db) {
    await connectToDatabase();
  }
  return db;
}

// Función para obtener una colección específica
async function getCollection(collectionName) {
  const database = await getDb();
  return database.collection(collectionName);
}

// Cierre graceful de la conexión
async function closeConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("🔌 Conexión a MongoDB cerrada");
  }
}

// Manejo de cierre graceful
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
});

export { getDb, getCollection, closeConnection, connectToDatabase };