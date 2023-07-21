import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';

@Entity()
export class ResetCodePasswords {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ type: 'varchar', length: 255, })
    email: string;

    @Column({ type: 'varchar', length: 255, })
    code: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}