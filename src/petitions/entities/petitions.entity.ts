import { Hires } from 'src/hires/entities/hires.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';

@Entity()
export class Petitions {
    @PrimaryGeneratedColumn()
    id: number;
  
    @PrimaryColumn({ type: 'varchar' })
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    attachment: string;

    @Column()
    user_id: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // @OneToMany(type => Hires, hire => hire.petition) hire: Hires;
}
