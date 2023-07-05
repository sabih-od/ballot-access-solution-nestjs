import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'data-source';

import { UsersSeeder } from './users/users.seeder';
import { RolesSeeder } from './roles/roles.seeder';

import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ModelHasRolesModule } from './model-has-roles/model-has-roles.module';

import { Roles } from './roles/entities/roles.entity';
import { Users } from './users/entities/users.entity';
import { ModelHasRoles } from './model-has-roles/entities/model-has-roles.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    TypeOrmModule.forFeature([Users, Roles, ModelHasRoles]), 
    RolesModule, 
    UsersModule, 
    AuthModule, 
    ModelHasRolesModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UsersSeeder, 
    RolesSeeder
  ],
})
export class AppModule {}