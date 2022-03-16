import env from "dotenv";
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { errorHandler } from "@common";
import { NotFoundError } from "@common";

env.config();
const app = express();

app.use(json());

app.all("*", async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };