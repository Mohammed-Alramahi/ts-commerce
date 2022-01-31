import { Entity, BaseEntity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import Order from './order';
import WishList from './wishlist';
@Entity('client')
export default class Client extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  last_name: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'varchar' })
  post_code: number;

  @Column({ type: "varchar" })
  country: string;

  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar', unique: true })
  phone: string;

  @Column({ type: "boolean", default: false })
  blacklisted: boolean;

  @Column({ type: "varchar" })
  gender: string;

  @Column({ type: "varchar" })
  avatar: string; 
    
  @Column({ type: "varchar" })
  verification_code: string;
  
  @Column({ type: "boolean", default: false })
  verified: boolean;
  
  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];

  @OneToMany(() => WishList, (wishlist) => wishlist.client)
  wishlist: WishList[];

 
}

