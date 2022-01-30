import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Category from './category';
import Vendor from "./vendor";

@Entity('product')
class Product extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  product_name: string;

  @Column({ type: 'varchar' })
  product_description: string;

  @Column({ type: 'varchar' })
  image1: string;

  @Column({ type: 'varchar' })
  image2: string;

  @Column({ type: 'varchar' })
  image3: string;

  @Column({ type: 'integer' })
  price: number;

  @Column({ type: "integer" })
  stock: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: Category;

  @ManyToOne(() => Vendor, vendor => vendor.id)
  @JoinColumn({ name: "vendor_id" })
  vendor: Vendor;
  
}
export default Product;
