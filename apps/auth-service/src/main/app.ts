import env from 'dotenv';
import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { json } from 'body-parser';
import { errorHandler } from '@common';
import { NotFoundError } from '@common';
import { SignUpRouter } from './routes/sign-up.route';

env.config();
const app = express();

app.use(json());
app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
    secure: false,
  })
);

app.use(SignUpRouter);

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
