import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SignedPetitions {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    petition_id: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    attachment: string;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    created_by: string;

    @Column({ type: 'bigint', nullable: true })
    validate_no: number;
    
    @Column({ type: 'varchar', length: 255, nullable: true })
    updated_by: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
