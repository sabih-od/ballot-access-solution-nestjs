import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { Roles } from '../decorators/roles.decorator';

import { PetitionsService } from './petitions.service';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Request } from 'express';

import { Role } from 'src/roles/entities/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PETITIONER)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(FileInterceptor('attachment', {
    storage: diskStorage({
      destination: 'uploads/petitions/unsigned'
    })
  }))
  create(
    @Body() createPetitionDto: CreatePetitionDto, 
    @Req() request: Request, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.petitionsService.create(createPetitionDto, request, file);
  }

  @Get()
  findAll() {
    return this.petitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petitionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetitionDto: UpdatePetitionDto) {
    return this.petitionsService.update(+id, updatePetitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petitionsService.remove(+id);
  }
}
