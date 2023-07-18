import { Injectable, UnauthorizedException, HttpException, HttpStatus, ExecutionContext, Inject, Req } from '@nestjs/common';
import { CreatePetitionDto } from './dto/create-petition.dto';
import { UpdatePetitionDto } from './dto/update-petition.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Petitions } from './entities/petitions.entity';
import { Request } from 'express';

@Injectable()
export class PetitionsService {
  constructor(
    @InjectRepository(Petitions)
    private repository: Repository<Petitions>,
  ) {}

  async create(createPetitionDto: CreatePetitionDto, request: Request, file) {
    try {
      const petitions = new Petitions();

      petitions.uuid = uuidv4();
      petitions.name = createPetitionDto.name;
      petitions.description = createPetitionDto.description;
      petitions.user_id = request.user['sub'];
      petitions.created_at = new Date();
      petitions.updated_at = new Date();

      if((file !== undefined)) {
        // petitions.attachment = file['path'] + '.pdf';
        petitions.attachment = file['filename'];
      }

      let petition = await this.repository.save(petitions);

      return petition;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(): Promise<Petitions[]> {
    try {

      return this.repository.find({
        select: {
          uuid: true,
          name: true,
          description: true,
          attachment: true
        }
      });

    } catch (error) {
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} petition`;
  }

  async findOneById(uuid: string) {
    try {
      return await this.repository.findOne({ where: { uuid: uuid } })
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error('Error occurred while retrieving user by email');
    }
  }

  async gatherers(uuid: string) {
    try {
      return await this.repository.find({ where: { uuid: uuid } })
    } catch (error) {
      // Handle the error appropriately (e.g., logging, throwing custom exceptions)
      throw new Error(error);
    }
  }

  update(id: number, updatePetitionDto: UpdatePetitionDto) {
    return `This action updates a #${id} petition`;
  }

  remove(id: number) {
    return `This action removes a #${id} petition`;
  }
}
