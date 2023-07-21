import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Roles } from './entities/roles.entity';
import { Role } from 'src/roles/entities/role.enum';

export class RolesSeeder {
    constructor(
        @InjectRepository(Roles)
        private repository: Repository<Roles>,
      ) {}

    async init() {

        let roles = [
            Role.ADMIN,
            Role.PETITIONER,
            Role.PETITIONER_GATHERER
        ];

        const roleList = await this.repository.find({ where: { name: In ( roles ) } });

        if( roleList?.length == 0 ) {
            // this.entityManager.query('TRUNCATE TABLE roles;')
        
            await this.repository
            .createQueryBuilder('roles')
            .insert()
            .into(Roles)
            .values(
                roles.map(
                    name => ({ name: name, guard_name: 'web', created_at: new Date(), updated_at: new Date() })
                )
            )
            .execute();
        }

    }
};