import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException, HttpException, HttpStatus, Req } from '@nestjs/common';
import { HiresService } from './hires.service';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from 'src/roles/entities/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from '../guards/auth.guard';
import { AcceptHireDto } from './dto/accept-hire.dto';
import { Request } from 'express';

@Controller('hires')
export class HiresController {
  constructor(private readonly hiresService: HiresService) {}

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.BALLOT_OR_INITIATIVE_COMMITTEE, 
    Role.PETITION_MANAGEMENT_COMPANY, 
    Role.POLITICAL_CANDIDATE, 
    Role.SITE_MANAGER
  )
  @Post()
  create(@Body() createHireDto: CreateHireDto, @Req() request: Request) {
    return this.hiresService.create(createHireDto, request);
  }

  @Get()
  findAll() {
    return this.hiresService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('request')
  request(@Req() request: Request) {
    return this.hiresService.request(request);
  }

  @UseGuards(AuthGuard)
  @Patch('accept')
  accept(@Req() request: Request, @Body() acceptHireDto: AcceptHireDto) {
    return this.hiresService.accept(request, acceptHireDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hiresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHireDto: UpdateHireDto) {
    return this.hiresService.update(+id, updateHireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hiresService.remove(+id);
  }
}
