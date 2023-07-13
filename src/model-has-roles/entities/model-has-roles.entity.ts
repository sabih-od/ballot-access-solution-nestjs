import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/roles/entities/roles.entity';

@Entity()
export class ModelHasRoles {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn({ type: 'bigint' })
  // @Column({ type: 'bigint' })
  role_id: number;

  @Column({ type: 'varchar', length: 255 })
  model_type: string;

  @PrimaryColumn({ type: 'varchar' })
  // @Column({ type: 'varchar' })
  model_id: string;

  @ManyToOne(() => Users, users => users.modelHasRoles)
  @JoinColumn({ name: 'model_id' })
  public users: Users;

  @ManyToOne(() => Roles, roles => roles.modelHasRoles)
  @JoinColumn({ name: 'role_id' })
  public roles: Roles;
}