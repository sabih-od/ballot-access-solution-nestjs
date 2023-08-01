import { Module } from '@nestjs/common';
import { HiresService } from './hires.service';
import { HiresController } from './hires.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hires } from './entities/hires.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { UsersService } from 'src/users/users.service';
import { Petitions } from 'src/petitions/entities/petitions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, ModelHasRoles, Roles, Hires, Petitions])],
  controllers: [HiresController],
  providers: [HiresService, UsersService],
})
export class HiresModule {}
