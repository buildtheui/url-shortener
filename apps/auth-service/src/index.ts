import env from 'dotenv';
import { app } from './main/app';

env.config();

app.listen(process.env.DEV_PORT, () =>
  console.log(`Listening on port ${process.env.DEV_PORT}`)
);
