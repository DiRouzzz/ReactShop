import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes/index';
import { errorHandler } from './middlewares/errorHandler';
import path from 'path';
import { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../frontendReactShop/dist')));

app.use('/api', routes);
app.use(errorHandler);

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../frontendReactShop/dist/index.html'));
});

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
