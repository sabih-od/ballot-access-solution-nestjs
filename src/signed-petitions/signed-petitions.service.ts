import { Injectable } from '@nestjs/common';
import { CreateSignedPetitionDto } from './dto/create-signed-petition.dto';
import { UpdateSignedPetitionDto } from './dto/update-signed-petition.dto';

@Injectable()
export class SignedPetitionsService {
  create(createSignedPetitionDto: CreateSignedPetitionDto) {
    return 'This action adds a new signedPetition';
  }

  findAll() {
    return `This action returns all signedPetitions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signedPetition`;
  }

  update(id: number, updateSignedPetitionDto: UpdateSignedPetitionDto) {
    return `This action updates a #${id} signedPetition`;
  }

  remove(id: number) {
    return `This action removes a #${id} signedPetition`;
  }
}
