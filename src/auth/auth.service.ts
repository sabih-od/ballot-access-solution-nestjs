import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/entities/users.entity';
import { Roles } from 'src/roles/entities/roles.entity';
import { ModelHasRoles } from 'src/model-has-roles/entities/model-has-roles.entity';
import { ResetCodePasswords } from 'src/reset-code-passwords/entities/reset-code-passwords.entity';
import { MailService } from '../services/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private repository: Repository<Users>,

    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,

    @InjectRepository(ModelHasRoles)
    private readonly modelHasRolesRepository: Repository<ModelHasRoles>,

    @InjectRepository(ResetCodePasswords)
    private readonly resetCodePasswordsRepository: Repository<ResetCodePasswords>,

    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService
  ) {}

  async signIn(email, pass) {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (!user) {
        throw new HttpException('Invalid credentials!', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        throw new HttpException('Invalid credentials!', HttpStatus.UNPROCESSABLE_ENTITY);
      }
      
      const payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(payload);
      
      return { access_token, user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(payload) {
    try {
      const findUser = await this.repository.findOne({ where: { email: payload?.email } });
      if(findUser != null) {
        throw new HttpException('Email already exist!', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const role = await this.rolesRepository.findOne({ where: { name: payload?.role } });
      if(!role || payload?.role == 'admin') {
        throw new HttpException('Invalid role!', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const users = new Users();

      const saltOrRounds = 10;
      const password = payload?.password;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      users.id = uuidv4();
      users.firstname = payload?.firstname;
      users.lastname = payload?.lastname;
      users.age = payload?.age;
      users.gender = payload?.gender;
      users.email = payload?.email;
      users.password = hashPassword;
      users.created_at = new Date();
      users.updated_at = new Date();

      let _user = await this.repository.save(users);

      await this.modelHasRolesRepository.save({
        role_id: role?.id,
        model_type: 'User',
        model_id: _user?.id
      });

      let user = await this.usersService.findOneById(_user?.id);
      if (!user) {
        throw new HttpException('User not found!', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      const _payload = { sub: user.id, email: user.email };
      const access_token = await this.jwtService.signAsync(_payload);
      
      return { access_token, user };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getProfile(req) {
    const user = await this.repository
                  .createQueryBuilder('users')
                  .select([
                    'users.id', 
                    'users.firstname',
                    'users.lastname', 
                    'users.age', 
                    'users.gender', 
                    'users.email',
                  ])
                  .leftJoinAndSelect('users.modelHasRoles', 'modelHasRoles', 'modelHasRoles.model_type = :modelType', {
                    modelType: 'User',
                  })
                  .leftJoinAndSelect('modelHasRoles.roles', 'roles')
                  .where('users.id = :userId', { userId: req.user?.sub })
                  .getOne();

    return await user;
  }

  async forgotPassword(email) {
    try {
      // find this user can exist
      const findUser = await this.repository.findOne({ where: { email: email } });

      if(findUser == null) {
        throw new HttpException('Email does not exist!', HttpStatus.UNPROCESSABLE_ENTITY);
      }

      // delete all old code that user send before.
      await this.resetCodePasswordsRepository
              .createQueryBuilder('reset_code_passwords')
              .delete()
              .from(ResetCodePasswords)
              .where("email = :email", { email: email })
              .execute()

      // insert reset code password
      const resetCodePasswords = new ResetCodePasswords();
      resetCodePasswords.code = Math.floor(Math.random() * Date.now()).toString(36);
      resetCodePasswords.email = email;
      resetCodePasswords.created_at = new Date();
      resetCodePasswords.updated_at = new Date();
  
      this.resetCodePasswordsRepository.save(resetCodePasswords);
      let link = process.env.FRONTEND_HOST + '#/reset-password?code=' + resetCodePasswords.code;
      
      const _email = email;
      const _subject = 'Reset password!';
      const _message = `Your reset password link is ${link}`;

      await this.mailService.sendEmail(_email, _subject, _message);

      return { message: 'Email sent successfully!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(payload) {
    try {
      const saltOrRounds = 10;
      const password = payload?.password;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);

      // find code in the reset code password table
      const findResetPasswordCode = await this.resetCodePasswordsRepository.findOne({ where: { code: payload?.code } })
      
      // if not found so through exception
      if(findResetPasswordCode == null) throw new HttpException('Code does not exist!', HttpStatus.UNPROCESSABLE_ENTITY);

      // find this user can exist
      const user = await this.repository.findOne({ where: { email: findResetPasswordCode?.email } });

      // if not found so through exception
      if(user == null) throw new HttpException('Email does not exist!', HttpStatus.UNPROCESSABLE_ENTITY);
      
      user.password = hashPassword;
      user.updated_at = new Date();

      // update password
      await this.repository.save(user);
      
      // delete code from table
      await this.resetCodePasswordsRepository
              .createQueryBuilder('reset_code_passwords')
              .delete()
              .from(ResetCodePasswords)
              .where("code = :code", { code: payload?.code })
              .execute()
      
      // return response
      return { message: 'Password has been reset successfully!' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}