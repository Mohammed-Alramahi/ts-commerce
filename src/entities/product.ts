import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Category from './category';

@Entity('product')
class Product extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  product_name: string;

  @Column({ type: 'varchar' })
  product_description: string;

  @Column({ type: 'simple-array' })
  images: string[];

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'numeric' })
  stock: number;

  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
export default Product;
