import { IsNotEmpty, IsString } from 'class-validator';

export class UploadPetitionDto {
    @IsNotEmpty()
    @IsString()
    uuid: string;

    attachment: Express.Multer.File | null;
}