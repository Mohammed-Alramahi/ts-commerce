import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import Client from './client';
import Product from './product';

@Entity('wishlist')
class WishList extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

export default WishList;
