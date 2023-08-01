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
  @Roles(
    Role.ADMIN
  )
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.BALLOT_OR_INITIATIVE_COMMITTEE, 
    Role.PETITION_MANAGEMENT_COMPANY, 
    Role.POLITICAL_CANDIDATE, 
    Role.SITE_MANAGER
  )
  @Get('/petition-gatherer')
  allPetitionGatherers() {
    return this.usersService.allPetitionGatherers();
  }

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.BALLOT_OR_INITIATIVE_COMMITTEE, 
    Role.PETITION_MANAGEMENT_COMPANY, 
    Role.POLITICAL_CANDIDATE, 
    Role.SITE_MANAGER
  )
  @Get('/petition-validator')
  allPetitionValidators() {
    return this.usersService.allPetitionValidators();
  }

  // @UseGuards(AuthGuard)
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOneById(@Param('id') id: string) {
    const user = this.usersService.findOneById(id);

    if(typeof user !== 'object') throw new HttpException('Invalid data!', HttpStatus.UNPROCESSABLE_ENTITY);

    return user;
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}