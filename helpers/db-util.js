import { MongoClient } from "mongodb";

export const connectDB = async () => {
  const client = new MongoClient(
    "mongodb+srv://test1:test1@cluster.rd9ob.mongodb.net/test1?retryWrites=true&w=majority"
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = await client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
};

export const getAllDocuments = async (client, collection, sort) => {
  client.db();
  const documents = await db
    .collection(collection)
    .find()
    .sort(sort) //descending order, lastest comm is first
    .toArray();
  return documents;
};
