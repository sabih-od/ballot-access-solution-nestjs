import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignedPetitionsService } from './signed-petitions.service';
import { CreateSignedPetitionDto } from './dto/create-signed-petition.dto';
import { UpdateSignedPetitionDto } from './dto/update-signed-petition.dto';

@Controller('signed-petitions')
export class SignedPetitionsController {
  constructor(private readonly signedPetitionsService: SignedPetitionsService) {}

  @Post()
  create(@Body() createSignedPetitionDto: CreateSignedPetitionDto) {
    return this.signedPetitionsService.create(createSignedPetitionDto);
  }

  @Get()
  findAll() {
    return this.signedPetitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signedPetitionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignedPetitionDto: UpdateSignedPetitionDto) {
    return this.signedPetitionsService.update(+id, updateSignedPetitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signedPetitionsService.remove(+id);
  }
}
