import { Hires } from 'src/hires/entities/hires.entity';
import { SignedPetitions } from 'src/signed-petitions/entities/signed-petitions.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Petitions {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar' })
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    name: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description: string

    @Column({ type: 'varchar', length: 255, nullable: true })
    attachment: string;

    @Column()
    user_id: string;

    @Column({ type: 'bigint', nullable: true, default: 0 })
    limit: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(type => Hires, hire => hire.petition) hire: Hires;

    @OneToMany(type => SignedPetitions, signPetition => signPetition.petition) signPetition: SignedPetitions;

    @ManyToOne(() => Users, user => user.petition)
    @JoinColumn({ name: 'user_id' })
    user: Users;
}