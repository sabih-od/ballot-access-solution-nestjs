import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { UsersService } from 'src/users/users.service';
import { PetitionsController } from './petitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petitions } from './entities/petitions.entity';
import { Users } from 'src/users/entities/users.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Roles } from 'src/roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Petitions, Users, ModelHasRoles, Roles])],
  controllers: [PetitionsController],
  providers: [PetitionsService, UsersService]
})
export class PetitionsModule {}