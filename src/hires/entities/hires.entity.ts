import { Petitions } from 'src/petitions/entities/petitions.entity';
import { Users } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

export enum StatusEnum {
    NOT_ACCEPT = '0',
    ACCEPT = '1',
}

@Entity()
export class Hires {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'bigint' })
    petition_id: number;

    @Column({ type: 'varchar', length: 255 })
    role_name: string;

    @Column({ type: 'varchar', length: 255 })
    receiver_id: string;

    @Column({ type: 'varchar', length: 255 })
    status: StatusEnum;

    @Column({ type: 'varchar', length: 255 })
    sender_id: string;

    @ManyToOne(() => Users, sender => sender.hire) 
    @JoinColumn({ name: 'sender_id' })
    sender: Users;

    @ManyToOne(() => Users, receiver => receiver._hire) 
    @JoinColumn({ name: 'receiver_id' })
    receiver: Users;

    @ManyToOne(() => Petitions, petition => petition.hire) 
    @JoinColumn({ name: 'petition_id' })
    petition: Petitions;
}
