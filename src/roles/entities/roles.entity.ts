import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { RoleHasPermissions } from 'src/role-has-permissions/entities/role-has-permissions.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';

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

  @OneToOne(() => ModelHasRoles, modelHasRoles => modelHasRoles.roles)
  modelHasRoles: ModelHasRoles[];

  @OneToMany(() => ModelHasRoles, modelHasRoles => modelHasRoles.roles)
  userRoles: ModelHasRoles[];

  @OneToMany(() => RoleHasPermissions, roleHasPermissions => roleHasPermissions.role)
  public roleHasPermissions: RoleHasPermissions;

  // Many-to-many relationship with Permission through the bridge table "role_has_permissions"
  @ManyToMany(() => Permissions)
  @JoinTable({
    name: 'role_has_permissions', // Specify the bridge table name here
    joinColumn: {
      name: 'role_id', // Specify the column name in the bridge table for the role's foreign key
    },
    inverseJoinColumn: {
      name: 'permission_id', // Specify the column name in the bridge table for the permission's foreign key
    },
  })
  permissions: Permissions[];
}