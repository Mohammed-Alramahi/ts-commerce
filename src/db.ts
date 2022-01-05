import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import { Client, Product, Category } from './entities/index';
dotenv.config({ path: 'config.env' });

const connectDB = async () => {
  try {
    await createConnection({
      type: 'postgres',
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [Client, Product, Category],
      //synchronize: true,
    });
    console.log('Connected');
  } catch (error) {
    console.error(error);
    throw new Error('Unable to Connect');
  }
};
export default connectDB;
