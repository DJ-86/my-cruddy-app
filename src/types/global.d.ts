// src/types/global.d.ts

import { MongoClient } from "mongodb";

declare global {
  namespace NodeJS {
    interface Global {
      _mongoClientPromise?: Promise<MongoClient>; // Optional property for the MongoDB client promise
    }
  }
}
