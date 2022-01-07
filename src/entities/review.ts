import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  ManyToOne,
  Column,
  JoinColumn,
} from 'typeorm';
import Client from './client';
import Product from './product';

@Entity('review')
class Review extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'numeric', default: 1 })
  rating: number;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
export default Review;
