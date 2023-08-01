import { IsNotEmpty, IsNumber } from 'class-validator';

export class AcceptHireDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;
}