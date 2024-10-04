import { MongoClient, MongoClientOptions } from "mongodb";

// Ensure the environment variable is set
const uri: string = process.env.MONGODB_URI as string;

const options: MongoClientOptions = {
  // Add any necessary MongoDB options
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to maintain the MongoDB connection
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect(); // This line should now recognize _mongoClientPromise
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, create a new MongoDB connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
