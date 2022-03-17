import env from 'dotenv';
import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from '@common';
import { NotFoundError } from '@common';
import { CreateURLRouter } from './routes/create.route';
import { GetByIdRouter } from './routes/get-by-short-url.route';

env.config();
const app = express();

app.use(json());
app.use(CreateURLRouter);
app.use(GetByIdRouter);

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
