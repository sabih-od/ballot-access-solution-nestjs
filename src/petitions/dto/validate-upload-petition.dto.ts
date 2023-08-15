import { IsNotEmpty } from 'class-validator';

export class ValidateUploadPetitionDto {
    @IsNotEmpty()
    validate_signature: number;
}