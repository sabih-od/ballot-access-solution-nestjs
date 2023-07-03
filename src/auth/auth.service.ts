import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,

    @InjectRepository(ModelHasRoles)
    private readonly modelHasRolesRepository: Repository<ModelHasRoles>,

    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findOneByEmail(email);
    const isMatch = await bcrypt.compare(pass, user?.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(payload) {
    const findUser = await this.repository.findOne({ where: { email: payload.email } });
    if(findUser != null) {
      throw new HttpException('Email already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const role = await this.rolesRepository.findOne({ where: { name: payload.role } });
    if(!role || payload.role == 'admin') {
      throw new HttpException('Role not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const users = new Users();

    const saltOrRounds = 10;
    const password = payload.password;
    const hashPassword = await bcrypt.hash(password, saltOrRounds);

    users.id = uuidv4();
    users.firstname = payload.firstname;
    users.lastname = payload.lastname;
    users.age = payload.age;
    users.gender = payload.gender;
    users.email = payload.email;
    users.password = hashPassword;
    users.created_at = new Date();
    users.updated_at = new Date();

    let user = await this.repository.save(users);

    this.modelHasRolesRepository.save({
        role_id: role?.id,
        model_type: 'User',
        model_id: user?.id
    });
    
    return this.repository.create(payload);
  }
  
}