import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permissions } from '../../permissions/entities/permissions.entity';
import { Permission } from 'src/permissions/entities/permissions.enum';
import { RoleHasPermissions } from 'src/role-has-permissions/entities/role-has-permissions.entity';
import { Role } from 'src/roles/entities/role.enum';
import { Helper } from 'src/helper';

export class PermissionsSeeder {
    constructor(
      @InjectRepository(Permissions)
      private repository: Repository<Permissions>,

      @InjectRepository(RoleHasPermissions)
      private roleHasPermissionsRepository: Repository<RoleHasPermissions>
    ) {}

    async init() {
      let permissions = [
        Permission.CREATE_USER,
        Permission.UPDATE_USER,
        Permission.VIEW_USER,
        Permission.DELETE_USER,
        Permission.CREATE_PETITION,
        Permission.UPDATE_PETITION,
        Permission.VIEW_PETITION,
        Permission.DELETE_PETITION,
        Permission.SEND_REQUEST,
        Permission.ACCEPT_REQUEST,
        Permission.UPLOAD_SIGNED_PETITIONS,
        Permission.VIEW_SIGNED_PETITIONS,
        Permission.VALIDATE_SIGNED_PETITIONS
      ];

      const permissionList = await this.repository.find({ where: { name: In ( permissions ) } });
      if( permissionList?.length == 0 ) {
        // this.entityManager.query('TRUNCATE TABLE permissions;')
        await this.repository
        .createQueryBuilder('permissions')
        .insert()
        .into(Permissions)
        .values(
          permissions.map(
            name => ({ name: name, guard_name: 'web', created_at: new Date(), updated_at: new Date() })
          )
        )
        .execute();
      }

      let roles = [
        Role.ADMIN,
        Role.SITE_MANAGER,
        Role.PETITION_MANAGEMENT_COMPANY,
        Role.BALLOT_OR_INITIATIVE_COMMITTEE,
        Role.PETITION_GATHERER,
        Role.PETITION_VALIDATOR,
        Role.POLITICAL_CANDIDATE,
      ];

      let roleHasPermissions = [
        // all permissions for admin role
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_USER), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_USER), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_USER), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_USER), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.SEND_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.ACCEPT_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.ADMIN)},
      
        // create petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.CREATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},

        // update petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPDATE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},

        // view petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_GATHERER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_VALIDATOR)},

        // delete petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.DELETE_PETITION), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},

        // send request
        {permission_id: Helper.getIdFromIndex(permissions, Permission.SEND_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.SEND_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.SEND_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.SEND_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},

        // accept request
        {permission_id: Helper.getIdFromIndex(permissions, Permission.ACCEPT_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.PETITION_GATHERER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.ACCEPT_REQUEST), role_id: Helper.getIdFromIndex(roles, Role.PETITION_VALIDATOR)},

        // upload sign petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.UPLOAD_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_GATHERER)},

        // view sign petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_GATHERER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VIEW_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_VALIDATOR)},

        // validate sign petition
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.SITE_MANAGER)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_MANAGEMENT_COMPANY)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.BALLOT_OR_INITIATIVE_COMMITTEE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.POLITICAL_CANDIDATE)},
        {permission_id: Helper.getIdFromIndex(permissions, Permission.VALIDATE_SIGNED_PETITIONS), role_id: Helper.getIdFromIndex(roles, Role.PETITION_VALIDATOR)}
      ];

      const roleHasPermissionList = await this.roleHasPermissionsRepository.find();
      if( roleHasPermissionList?.length == 0 ) {
        // this.entityManager.query('TRUNCATE TABLE permissions;')
        await this.roleHasPermissionsRepository
        .createQueryBuilder('role_has_permissions')
        .insert()
        .into(RoleHasPermissions)
        .values(
          await Promise.all(roleHasPermissions.map(async value => ({
            permission_id: await value.permission_id,
            role_id: await value.role_id
          })))
        )
        .execute();
      }
    }
};