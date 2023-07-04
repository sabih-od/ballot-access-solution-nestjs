import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  guard_name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => ModelHasRoles, modelHasRoles => modelHasRoles.roles)
  modelHasRoles: ModelHasRoles[];
}