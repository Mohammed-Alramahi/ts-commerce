import {
  Entity,
  BaseEntity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Min } from 'class-validator';
import Order from './order';
import WishList from './wishlist';

@Entity('client')
class Client extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  @Min(8)
  password: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'numeric' })
  post_code: number;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => WishList, (wishlist) => wishlist.id)
  wishlist: WishList[];
}

export default Client;
