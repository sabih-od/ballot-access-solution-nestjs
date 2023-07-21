import { PartialType } from '@nestjs/mapped-types';
import { CreateResetCodePasswordDto } from './create-reset-code-password.dto';

export class UpdateResetCodePasswordDto extends PartialType(CreateResetCodePasswordDto) {}
