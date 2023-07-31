import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from 'data-source';

import { UsersSeeder } from './users/users.seeder';
import { RolesSeeder } from './roles/roles.seeder';
import { PermissionsSeeder } from './database/seeders/permissions.seeder';

import { Roles } from './roles/entities/roles.entity';
import { Users } from './users/entities/users.entity';
import { ModelHasRoles } from './model-has-roles/entities/model-has-roles.entity';
import { Petitions } from './petitions/entities/petitions.entity';
import { Permissions } from './permissions/entities/permissions.entity';
import { RoleHasPermission } from './role-has-permissions/entities/role-has-permission.entity';
import { ResetCodePasswords } from './reset-code-passwords/entities/reset-code-passwords.entity';
import { Hires } from './hires/entities/hires.entity';

import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ModelHasRolesModule } from './model-has-roles/model-has-roles.module';
import { PetitionsModule } from './petitions/petitions.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RoleHasPermissionsModule } from './role-has-permissions/role-has-permissions.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ResetCodePasswordsModule } from './reset-code-passwords/reset-code-passwords.module';
import { HiresModule } from './hires/hires.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions), 
    TypeOrmModule.forFeature([
      Users, 
      Roles, 
      ModelHasRoles, 
      Permissions, 
      RoleHasPermission, 
      Petitions,
      ResetCodePasswords,
      Hires
    ]),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
    }),

    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..'),
    // }),

    RolesModule, 
    UsersModule, 
    AuthModule, 
    ModelHasRolesModule, 
    PetitionsModule, 
    PermissionsModule,
    RoleHasPermissionsModule,
    ResetCodePasswordsModule,
    HiresModule
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    UsersSeeder, 
    RolesSeeder,
    PermissionsSeeder
  ],
})
export class AppModule {}