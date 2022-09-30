import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI as string;
let dbName = process.env.MONGODB_DB as string;

let cachedClient: any = null;
let cachedDb: any = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    await cachedClient.connect();
    return { client: cachedClient, db: cachedDb };
  }

  // const client = await MongoClient.connect(uri, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });

  // const db = await client.db(dbName);
  const client = await MongoClient.connect(uri);
  await client.connect();
  const database = client.db(dbName);
  const postsCollection = database.collection('posts');
  // const client = await MongoClient.connect(uri);
  // const db = client.db(dbName);
  // await client.connect();

  cachedClient = client;
  cachedDb = postsCollection;

  return { client, db: postsCollection };
}
