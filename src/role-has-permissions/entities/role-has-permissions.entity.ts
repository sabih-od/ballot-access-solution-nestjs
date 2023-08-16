import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Roles } from "../../roles/entities/roles.entity";

@Entity()
export class RoleHasPermissions {
    @PrimaryColumn()
    permission_id: number;

    @PrimaryColumn()
    role_id: number;
    
    @OneToOne(() => Roles, role => role.roleHasPermissions)
    @JoinColumn({ name: 'role_id' })
    public role: Roles;
}