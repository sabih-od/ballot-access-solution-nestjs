import { Injectable } from '@nestjs/common';
import { CreateResetCodePasswordDto } from './dto/create-reset-code-password.dto';
import { UpdateResetCodePasswordDto } from './dto/update-reset-code-password.dto';

@Injectable()
export class ResetCodePasswordsService {
  create(createResetCodePasswordDto: CreateResetCodePasswordDto) {
    return 'This action adds a new resetCodePassword';
  }

  findAll() {
    return `This action returns all resetCodePasswords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetCodePassword`;
  }

  update(id: number, updateResetCodePasswordDto: UpdateResetCodePasswordDto) {
    return `This action updates a #${id} resetCodePassword`;
  }

  remove(id: number) {
    return `This action removes a #${id} resetCodePassword`;
  }
}
