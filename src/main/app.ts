import env from "dotenv";
import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { CreateURLRouter } from "@main/routes/create.route";
import { errorHandler } from "@main/middlewares/error-handler";
import { NotFoundError } from "@application/errors/not-found-error";
import { GetByIdRouter } from "@main/routes/get-by-short-url.route";

env.config();
const app = express();

app.use(json());
app.use(CreateURLRouter);
app.use(GetByIdRouter);

app.all("*", async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };