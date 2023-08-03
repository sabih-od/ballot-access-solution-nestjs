import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { UsersService } from 'src/users/users.service';
import { PetitionsController } from './petitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petitions } from './entities/petitions.entity';
import { Users } from 'src/users/entities/users.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { Hires } from 'src/hires/entities/hires.entity';
import { SignedPetitions } from 'src/signed-petitions/entities/signed-petitions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Petitions, Users, ModelHasRoles, Roles, Hires, SignedPetitions])],
  controllers: [PetitionsController],
  providers: [PetitionsService, UsersService]
})
export class PetitionsModule {}