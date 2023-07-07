import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

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
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.id', 
          'users.firstname',
          'users.lastname', 
          'users.age', 
          'users.gender', 
          'users.email',
          'users.password'
        ])
        .leftJoinAndSelect('users.modelHasRoles', 'modelHasRoles', 'modelHasRoles.model_type = :modelType', {
          modelType: 'User',
        })
        .leftJoinAndSelect('modelHasRoles.roles', 'roles')
        .where('users.email = :email', { email })
        .getOne();

      // return await this.userRepository.findOne({ where: { email: email }, relations: ['modelHasRoles', 'modelHasRoles.roles'] });
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  async findOneById(id: string) {
    try {
      return await this.userRepository
        .createQueryBuilder('users')
        .select([
          'users.id', 
          'users.firstname',
          'users.lastname', 
          'users.age', 
          'users.gender', 
          'users.email',
          'users.password'
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  
}
