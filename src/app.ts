import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './db';
import { authRouter } from './routes/auth';
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());

const start = () => {
  app.listen(process.env.PORT, async () => {
    console.log(`The Magic Happens On Port ${process.env.PORT}`);
    await connectDB();
  });
};

start();

app.get('/', (req: Request, res: Response) => {
  res.send(
    `<h1 style="text-align:center">“Never let the fear of striking out keep you from playing the game.”– Babe Ruth</h1>`
  );
});

app.use('/api/auth', authRouter);
