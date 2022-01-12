import express from "express";
import env from "dotenv";
import "express-async-errors";
import { json } from "body-parser";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { CreateURLRouter } from "@main/routes/create.route";
import { errorHandler } from "@main/middlewares/error-handler";
import { NotFoundError } from "@application/errors/not-found-error";
import { GetByIdRouter } from "@main/routes/get-by-short-url.route";

// TODO: refactor to clean up this index file

env.config();
const app = express();

app.use(json());
app.use(CreateURLRouter);
app.use(GetByIdRouter);

const databaseSetup = async () => {
  const mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri, { dbName: "shortLink" });
};

databaseSetup();

app.all("*", async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(process.env.DEV_PORT, () => console.log(`Listening on port ${process.env.DEV_PORT}`));
