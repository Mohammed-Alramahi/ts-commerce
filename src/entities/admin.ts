import { Entity, BaseEntity, Column, PrimaryColumn } from 'typeorm';

@Entity('admin')
export default class Admin extends BaseEntity {

    @PrimaryColumn({ type: 'uuid' })
    id: string;

    @Column({ unique: true, type: 'varchar' })
    email: string;

    @Column({ type: 'varchar' })
    user_name: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'boolean', default: true })
    verified: boolean;
}

