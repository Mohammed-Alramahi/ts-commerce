import { BaseEntity, Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Min } from 'class-validator';
import Product from "./product";

@Entity('vendor')
export default class Vendor extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  first_name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  @Min(8)
  password: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'numeric' })
  post_code: number;

  @Column({ type: "varchar" })
  country: string;
  
  @Column({ type: 'varchar' })
  city: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ type: "varchar" })
  avatar: string;
  
  @OneToMany(() => Product, product => product)
  products: Product[];
  
}

