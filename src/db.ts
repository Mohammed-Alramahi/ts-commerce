import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import Client from "./entities/client";
import Category from "./entities/category";
import Order from "./entities/order";
import Product from "./entities/product";
import Review from "./entities/review";
import Vendor from "./entities/vendor";
import Wishlist from "./entities/wishlist";
import Admin from "./entities/admin";
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
      entities: [Client, Category, Order, Product, Review, Vendor, Wishlist, Admin],
      //this property for migrations,
      synchronize: true,
    });
    console.log('Connected');

  } catch (error) {
    console.error(error);
    throw new Error('Unable to Connect');
  }
};
export default connectDB;
