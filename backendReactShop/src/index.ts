import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = ['http://localhost:5173', 'http://94.198.216.234'];
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);
app.use(errorHandler);

const start = async () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION!).then(() => {
      app.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
    process.exit(1);
  }
};

start();
