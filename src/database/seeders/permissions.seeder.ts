import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permissions } from '../../permissions/entities/permissions.entity';
import { Permission } from 'src/permissions/entities/permissions.enum';

export class PermissionsSeeder {
    constructor(
        @InjectRepository(Permissions)
        private repository: Repository<Permissions>
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
    }
};