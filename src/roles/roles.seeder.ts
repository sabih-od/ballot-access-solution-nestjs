import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Roles } from './entities/roles.entity';
import { Role } from 'src/roles/entities/role.enum';
import { HttpException, HttpStatus } from '@nestjs/common';

export class RolesSeeder {
    constructor(
        @InjectRepository(Roles)
        private repository: Repository<Roles>,
      ) {}

    async init() {

        try {
            let roles = [
                Role.ADMIN,
                Role.SITE_MANAGER,
                Role.PETITION_MANAGEMENT_COMPANY,
                Role.BALLOT_OR_INITIATIVE_COMMITTEE,
                Role.PETITION_GATHERER,
                Role.PETITION_VALIDATOR,
                Role.POLITICAL_CANDIDATE,
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
    
            else {
                for (const key in roles) {
                    if (Object.prototype.hasOwnProperty.call(roles, key)) {
                        const element = roles[key];
                        let findRole = await this.repository.findOne({ where: { name: element } })
                        if( !findRole ) {
                            await this.repository
                                .createQueryBuilder('roles')
                                .insert()
                                .into(Roles)
                                .values({ id: (parseInt(key) + 1), name: element, guard_name: 'web', created_at: new Date(), updated_at: new Date() })
                                .execute();
                        }
                    }
                }
            }
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }

    }
};