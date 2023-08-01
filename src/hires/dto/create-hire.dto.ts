import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHireDto {
    @IsNotEmpty()
    @IsString()
    petition_uuid: string;

    @IsNotEmpty()
    @IsString()
    role_name: string;

    @IsNotEmpty()
    @IsString()
    receiver_id: string;
}