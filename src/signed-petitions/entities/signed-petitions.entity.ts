import { Petitions } from "src/petitions/entities/petitions.entity";
import { Users } from "src/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SignedPetitions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    petition_id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    attachment: string;

    @Column({ type: 'bigint', nullable: true, default: 0 })
    validate_signature: number;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    created_by: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    updated_by: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @ManyToOne(() => Users, user => user.creator)
    @JoinColumn({ name: 'created_by' })
    creator: Users;

    @ManyToOne(() => Users, user => user.updator)
    @JoinColumn({ name: 'updated_by' })
    updator: Users;

    @ManyToOne(() => Petitions, petition => petition.signPetition)
    @JoinColumn({ name: 'petition_id' })
    petition: Petitions;
    
}