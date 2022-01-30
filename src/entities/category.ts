import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('category')
export default class Category extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  category_name: string;

  @Column({ type: 'varchar' })
  category_image: string;

  @Column({ type: 'varchar' })
  category_description: string;
}


