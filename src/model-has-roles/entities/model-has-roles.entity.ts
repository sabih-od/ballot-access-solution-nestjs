import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
// import { Users } from 'src/users/entities/users.entity';
// import { Roles } from 'src/roles/entities/roles.entity';

@Entity()
export class ModelHasRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  role_id: number;

  @Column({ type: 'varchar', length: 255 })
  model_type: string;

  @Column({ type: 'varchar', length: 255 })
  model_id: string;

  // @OneToOne(() => Users, user => user.modelHasRoles)
  // @JoinColumn()
  // user: Users;

  // @OneToOne(() => Roles)
  // @JoinColumn()
  // role: Roles;
}