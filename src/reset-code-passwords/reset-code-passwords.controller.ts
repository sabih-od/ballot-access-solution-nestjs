import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResetCodePasswordsService } from './reset-code-passwords.service';
import { CreateResetCodePasswordDto } from './dto/create-reset-code-password.dto';
import { UpdateResetCodePasswordDto } from './dto/update-reset-code-password.dto';

@Controller('reset-code-passwords')
export class ResetCodePasswordsController {
  constructor(private readonly resetCodePasswordsService: ResetCodePasswordsService) {}

  @Post()
  create(@Body() createResetCodePasswordDto: CreateResetCodePasswordDto) {
    return this.resetCodePasswordsService.create(createResetCodePasswordDto);
  }

  @Get()
  findAll() {
    return this.resetCodePasswordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resetCodePasswordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResetCodePasswordDto: UpdateResetCodePasswordDto) {
    return this.resetCodePasswordsService.update(+id, updateResetCodePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resetCodePasswordsService.remove(+id);
  }
}
