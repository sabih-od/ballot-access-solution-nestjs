import { Module } from '@nestjs/common';
import { PetitionsService } from './petitions.service';
import { UsersService } from 'src/users/users.service';
import { PetitionsController } from './petitions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petitions } from './entities/petitions.entity';
import { Users } from 'src/users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Petitions, Users])],
  controllers: [PetitionsController],
  providers: [PetitionsService, UsersService]
})
export class PetitionsModule {}