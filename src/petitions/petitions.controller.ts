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
import { UploadPetitionDto } from './dto/upload-petition.dto';
import { ValidateUploadPetitionDto } from './dto/validate-upload-petition.dto';

@Controller('petitions')
export class PetitionsController {
  constructor(private readonly petitionsService: PetitionsService) {}

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.BALLOT_OR_INITIATIVE_COMMITTEE, 
    Role.PETITION_MANAGEMENT_COMPANY, 
    Role.POLITICAL_CANDIDATE,
    Role.SITE_MANAGER
  )
  @HttpCode(HttpStatus.OK)
  @Post()
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: 'uploads/unsigned-petitions',
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
  findAll(@Req() request: Request) {
    return this.petitionsService.findAll(request);
  }

  @UseGuards(AuthGuard)
  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @Req() request: Request) {
    return this.petitionsService.findOneById(uuid, request);
  }

  @UseGuards(AuthGuard)
  @Get('/:uuid/signed-petition/:id')
  findSignedPetition(@Param('id') id: number) {
    return this.petitionsService.findSignedPetition(id);
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

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.BALLOT_OR_INITIATIVE_COMMITTEE, 
    Role.PETITION_MANAGEMENT_COMPANY, 
    Role.POLITICAL_CANDIDATE, 
    Role.SITE_MANAGER
  )
  @HttpCode(HttpStatus.OK)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('attachment', {
      storage: diskStorage({
        destination: 'uploads/signed-petitions',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExtension = extname(file.originalname);
          callback(null, uniqueName + fileExtension);
        },
      }),
    }),
  )
  upload(
    @Body() uploadPetitionDto: UploadPetitionDto, 
    @Req() request: Request, 
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.petitionsService.upload(uploadPetitionDto, request, file);
  }

  @UseGuards(RolesGuard)
  @Roles(
    Role.ADMIN,
    Role.PETITION_VALIDATOR
  )
  @Patch('/validate/:id')
  validate(@Param('id') id: string, @Body() validateUploadPetitionDto: ValidateUploadPetitionDto, @Req() request: Request) {
    return this.petitionsService.validatePetition(+id, validateUploadPetitionDto, request);
  }
}