import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';
import { Min } from 'class-validator';

@Entity('client')
class Client extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  client_id: string;

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
}

export default Client;
