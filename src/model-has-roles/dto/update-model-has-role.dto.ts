import { PartialType } from '@nestjs/mapped-types';
import { CreateModelHasRoleDto } from './create-model-has-role.dto';

export class UpdateModelHasRoleDto extends PartialType(CreateModelHasRoleDto) {}
