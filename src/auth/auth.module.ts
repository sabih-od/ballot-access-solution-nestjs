// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { Permissions } from 'src/permissions/entities/permissions.entity';
import { RoleHasPermission } from 'src/role-has-permissions/entities/role-has-permission.entity';
import { ResetCodePasswords } from 'src/reset-code-passwords/entities/reset-code-passwords.entity';
import { MailService } from 'src/services/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1200s' },
    }),
    TypeOrmModule.forFeature([
      Users, 
      Roles, 
      ModelHasRoles, 
      Permissions, 
      RoleHasPermission,
      ResetCodePasswords
    ])
  ],
  providers: [AuthService, LocalStrategy, MailService],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}