import { PartialType } from '@nestjs/mapped-types';
import { CreateSignedPetitionDto } from './create-signed-petition.dto';

export class UpdateSignedPetitionDto extends PartialType(CreateSignedPetitionDto) {}
