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
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new HttpException('Invalid credentials!', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials!', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(payload);
      
      return { access_token, user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async register(payload) {
    try {
      const findUser = await this.repository.findOne({ where: { email: payload.email } });
      if(findUser != null) {
        throw new HttpException('Email already exist', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const role = await this.rolesRepository.findOne({ where: { name: payload.role } });
      if(!role || payload.role == 'admin') {
        throw new HttpException('Invalid role!', HttpStatus.UNPROCESSABLE_ENTITY);
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

      let _user = await this.repository.save(users);

      await this.modelHasRolesRepository.save({
          role_id: role?.id,
          model_type: 'User',
          model_id: _user?.id
      });

      let user = await this.usersService.findOneById(_user?.id);
      if (!_user) {
        throw new HttpException('User not found!', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const _payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(_payload);
      
      return { access_token, _user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async getProfile(req) {
    const user = await this.repository
                  .createQueryBuilder('users')
                  .select([
                    'users.id', 
                    'users.firstname',
                    'users.lastname', 
                    'users.age', 
                    'users.gender', 
                    'users.email',
                  ])
                  .leftJoinAndSelect('users.modelHasRoles', 'modelHasRoles', 'modelHasRoles.model_type = :modelType', {
                    modelType: 'User',
                  })
                  .leftJoinAndSelect('modelHasRoles.roles', 'roles')
                  .where('users.id = :userId', { userId: req.user?.sub })
                  .getOne();

    return await user;

    // return await req.user;
  }
}