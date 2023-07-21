import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permissions } from '../../permissions/entities/permissions.entity';

export class PermissionsSeeder {
    constructor(
        @InjectRepository(Permissions)
        private repository: Repository<Permissions>
      ) {}

    async init() {
      let permissions = [
        'create_user',
        'update_user',
        'view_user',
        'delete_user',
        'create_petition',
        'update_petition',
        'view_petition',
        'delete_petition'
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