import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private roleRepository: Repository<Roles>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    const { id, name, guard_name, created_at, updated_at } = createRoleDto;

    const roles = new Roles();
    roles.id = id;
    roles.name = name;
    roles.guard_name = guard_name;
    roles.created_at = created_at;
    roles.updated_at = updated_at;

    return this.roleRepository.save(roles);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  async findByName(name: string) {
    try {
      return await this.roleRepository.findOne({ where: { name: name } });
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error('Error occurred while retrieving user by email');
    }
  }
}