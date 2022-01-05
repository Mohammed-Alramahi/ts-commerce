import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import connectDB from './db';

const app: Application = express();

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
