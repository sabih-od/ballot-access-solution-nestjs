import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

export class RolesSeeder {
    constructor(
        @InjectRepository(Roles)
        private repository: Repository<Roles>,
      ) {}

    async init() {
        let findAdminRole = await this.repository.findOne({ where: { name: 'admin' } });
        if(findAdminRole == null) {
            const roles = new Roles();

            roles.id = 1;
            roles.name = 'admin';
            roles.guard_name = 'web';
            roles.created_at = new Date();
            roles.updated_at = new Date();

            this.repository.save(roles);
        }

        let findPetitionerRole = await this.repository.findOne({ where: { name: 'petitioner' } });
        if(findPetitionerRole == null) {
            const roles = new Roles();

            roles.id = 2;
            roles.name = 'petitioner';
            roles.guard_name = 'web';
            roles.created_at = new Date();
            roles.updated_at = new Date();

            this.repository.save(roles);
        }

        let findPetitionerGathererRole = await this.repository.findOne({ where: { name: 'petition_gatherer' } });
        if(findPetitionerGathererRole == null) {
            const roles = new Roles();

            roles.id = 3;
            roles.name = 'petition_gatherer';
            roles.guard_name = 'web';
            roles.created_at = new Date();
            roles.updated_at = new Date();

            this.repository.save(roles);
        }
    }
};