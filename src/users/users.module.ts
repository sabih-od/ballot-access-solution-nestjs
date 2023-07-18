import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';

import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Roles } from 'src/roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ModelHasRoles, Roles])], // Import the User entity using TypeOrmModule.forFeature(),
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
