import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('category')
class Category extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  category_id: string;

  @Column({ type: 'varchar' })
  category_name: string;

  @Column({ type: 'varchar' })
  category_image: string;

  @Column({ type: 'varchar' })
  category_description: string;
}

export default Category;
