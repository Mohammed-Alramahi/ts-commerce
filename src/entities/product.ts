import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('product')
class Product extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  product_id: string;

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

  @Column({ type: 'numeric' })
  category_id: number;
}
export default Product;
