import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import dataSource from 'data-source';
import { Role } from 'src/roles/entities/role.enum';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  constructor(
    @InjectRepository(Users) private repository: Repository<Users>,
    @InjectRepository(ModelHasRoles) private modelHasRolesRepository: Repository<ModelHasRoles>,
    @InjectRepository(Roles) private rolesRepository: Repository<Roles>
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<Users[]> {
    try {

      return this.repository.find({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            age: true,
            gender: true,
            email: true,
            phone: true,
            address: true,
            company: true
        },
        relations: {
          modelHasRoles: {
            roles: true
          },
        },
      });

    } catch (error) {
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneByEmail(email: string) {
    try {
      
      return await this.repository
        .createQueryBuilder('users')
        .select([
          'users.id', 
          'users.firstname',
          'users.lastname', 
          'users.age', 
          'users.gender', 
          'users.email',
          'users.password',
          'users.phone',
          'users.address',
          'users.company'
        ])
        .leftJoinAndSelect('users.modelHasRoles', 'modelHasRoles', 'modelHasRoles.model_type = :modelType', {
          modelType: 'User',
        })
        .leftJoinAndSelect('modelHasRoles.roles', 'roles')
        .where('users.email = :email', { email })
        .getOne();

      // return await this.repository.findOne({ where: { email: email }, relations: ['modelHasRoles', 'modelHasRoles.roles'] });
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  async findOneById(id: string) {
    try {
      return await this.repository
        .createQueryBuilder('users')
        .select([
          'users.id', 
          'users.firstname',
          'users.lastname', 
          'users.age', 
          'users.gender', 
          'users.email',
          'users.password',
          'users.phone',
          'users.address',
          'users.company',
        ])
        .leftJoinAndSelect('users.modelHasRoles', 'modelHasRoles', 'modelHasRoles.model_type = :modelType', {
          modelType: 'User',
        })
        .leftJoinAndSelect('modelHasRoles.roles', 'roles')
        .where('users.id = :id', { id })
        .getOne();
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  async update(id: string, payload) {
    try {

      const user = await this.repository.findOneBy({ id });

      if(user != null) {
        user.firstname = payload.firstname;
        user.lastname = payload.lastname;
        user.phone = payload.phone;
        user.company = payload.company;
        user.address = payload.address;
        user.age = payload.age;
        user.gender = payload.gender;
        user.updated_at = new Date();

        return await this.repository.save(user);
      }
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async allPetitionGatherers() {
    try {
      let petition_gatherer = Role.PETITIONER_GATHERER;

      let data = await this.rolesRepository
                      .createQueryBuilder('roles')
                      .select([
                        'roles.name',
                        'modelHasRoles.role_id',
                        'modelHasRoles.model_id',
                        'modelHasRoles.model_type',
                        'users.id',
                        'users.firstname',
                        'users.lastname',
                        'users.age',
                        'users.gender',
                        'users.email',
                        'users.phone',
                        'users.address',
                        'users.company'
                      ])
                      .leftJoin('roles.userRoles', 'modelHasRoles')
                      .leftJoin('modelHasRoles.user', 'users')
                      .where('roles.name = :petition_gatherer', { petition_gatherer })
                      .getOne();

      return data?.userRoles ?? [];
      
    } catch (error) {
      
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error(error);
    }
  }
}
