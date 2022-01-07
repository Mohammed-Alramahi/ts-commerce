import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Client from './client';

@Entity('order')
class Order extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'date' })
  order_date: Date;

  @Column({ type: 'numeric' })
  order_total: number;

  @Column({ type: 'date' })
  shipping_date: Date;

  @Column({ type: 'boolean', default: false })
  is_delivered: boolean;

  @ManyToOne(() => Client, (client) => client.id)
  @JoinColumn({
    name: 'client_id',
  })
  client: Client;
}

export default Order;
