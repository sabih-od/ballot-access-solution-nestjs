import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'src/roles/entities/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get(':username')
  // findOne(@Param('username') username: string) {
  //   return this.usersService.findOne(username);
  // }

  // @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    const user = this.usersService.findOneById(id);

    if(typeof user !== 'object') throw new HttpException('Invalid data!', HttpStatus.UNPROCESSABLE_ENTITY);

    // if(Object.keys(user).length === 0) throw new HttpException('Record not found!', HttpStatus.UNPROCESSABLE_ENTITY);

    return user;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
