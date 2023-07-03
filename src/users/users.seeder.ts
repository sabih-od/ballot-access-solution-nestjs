import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

export class UsersSeeder {
    constructor(
        @InjectRepository(Users)
        private readonly repository: Repository<Users>,

        @InjectRepository(ModelHasRoles)
        private readonly modelHasRolesRepository: Repository<ModelHasRoles>,
      ) {}

    async init() {

        // create product owner user
        let email = 'productowner@yopmail.com';
        let user = await this.repository.findOne({ where: { email: email} });
        if(user == null) {
            const users = new Users();

            const saltOrRounds = 10;
            const password = '12345678';
            const hashPassword = await bcrypt.hash(password, saltOrRounds);

            users.id = uuidv4();
            users.firstname = 'Product';
            users.lastname = 'Owner';
            users.age = 30;
            users.gender = 'male';
            users.email = email;
            users.password = hashPassword;
            users.created_at = new Date();
            users.updated_at = new Date();

            user = await this.repository.save(users);

            this.modelHasRolesRepository.save({
                role_id: 1,
                model_type: 'User',
                model_id: user?.id
            });
        }
    }
};
