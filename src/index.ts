import env from "dotenv";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "@main/app";

env.config();

const databaseSetup = async () => {
  const mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri, { dbName: process.env.MONGO_DB_NAME });
};

databaseSetup();

app.listen(process.env.DEV_PORT, () =>
  console.log(`Listening on port ${process.env.DEV_PORT}`)
);
