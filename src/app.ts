import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './db';
import authRouter from './routes/auth';
import { quoteOfTheDay } from "./qod";
import productsRouter from "./routes/product";
import adminRouter from "./routes/admin";
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

app.get('/', async(req: Request, res: Response) => {
  res.send(
    `<h1 style="text-align:center">`+await quoteOfTheDay()+`</h1>`
  );
});

app.use("/api/auth", authRouter);
app.use("/api/product", productsRouter);
app.use("/api/admin", adminRouter);