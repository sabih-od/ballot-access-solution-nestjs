import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ModelHasRolesService } from './model-has-roles.service';
import { CreateModelHasRoleDto } from './dto/create-model-has-role.dto';
import { UpdateModelHasRoleDto } from './dto/update-model-has-role.dto';

@Controller('model-has-roles')
export class ModelHasRolesController {
  constructor(private readonly modelHasRolesService: ModelHasRolesService) {}

  @Post()
  create(@Body() createModelHasRoleDto: CreateModelHasRoleDto) {
    return this.modelHasRolesService.create(createModelHasRoleDto);
  }

  @Get()
  findAll() {
    return this.modelHasRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.modelHasRolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateModelHasRoleDto: UpdateModelHasRoleDto) {
    return this.modelHasRolesService.update(+id, updateModelHasRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.modelHasRolesService.remove(+id);
  }
}
