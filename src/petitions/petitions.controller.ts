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
import { extname } from 'path';

@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.PETITIONER)
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname);
          callback(null, uniqueName + fileExtension);
        },
      }),
    }),
  )
  create(
    @Body() createPetitionDto: CreatePetitionDto, 
    @Req() request: Request, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.petitionsService.create(createPetitionDto, request, file);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.petitionsService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.petitionsService.findOneById(uuid);
  }

  @Get('/gatherers/:uuid')
  gatherers(@Param('uuid') uuid: string) {
    return this.petitionsService.gatherers(uuid);
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