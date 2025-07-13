import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';

const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use(errorHandler);

const start = async () => {
  try {
    if (!process.env.DB_CONNECTION) {
      throw new Error('DB_CONNECTION not defined in env file');
    }
    mongoose.connect(process.env.DB_CONNECTION).then(() => {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log(`CORS origin: ${process.env.FRONTEND_URL}`);
        console.log(`Env mode: ${envFile}`);
      });
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

start();
