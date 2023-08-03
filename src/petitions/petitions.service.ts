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
// import { runCustomQuery } from 'data-source';
import { Helper } from './../helper';
import { Hires, StatusEnum } from 'src/hires/entities/hires.entity';
import { Role } from 'src/roles/entities/role.enum';
import { UploadPetitionDto } from './dto/upload-petition.dto';
import { SignedPetitions } from 'src/signed-petitions/entities/signed-petitions.entity';

@Injectable()
export class PetitionsService {
  constructor(
    @InjectRepository(Petitions)
    private repository: Repository<Petitions>,

    @InjectRepository(Hires)
    private hireRepository: Repository<Hires>,

    @InjectRepository(SignedPetitions)
    private signedPetitionRepository: Repository<SignedPetitions>
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
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(request: any) {
    try {
      const role = await Helper.role(request.user['sub']); // Using the helper service to get the role

      // fetch all petitions
      if (role == Role.ADMIN) {
        return this.repository.find({
          select: {
            uuid: true,
            name: true,
            description: true,
            attachment: true,
            user: {
              firstname: true,
              lastname: true,
              email: true,
              phone: true
            }
          },
          relations: {
            user: true
          }
        });
      }

      // fetch petitioner petitions
      if (
        role == Role.SITE_MANAGER || 
        role == Role.PETITION_MANAGEMENT_COMPANY || 
        role == Role.BALLOT_OR_INITIATIVE_COMMITTEE ||
        role == Role.POLITICAL_CANDIDATE
      ) {
        return this.repository.find({
          select: {
            uuid: true,
            name: true,
            description: true,
            attachment: true,
            user: {
              firstname: true,
              lastname: true,
              email: true,
              phone: true
            }
          },
          where: {
            user_id: request.user['sub']
          },
          relations: {
            user: true
          }
        });
      }

      // fetch all assignees petitions (petition gatherer / validator)
      else {
        let petition = [];
        const hire = await this.hireRepository.find({
          select: {
            petition: {
              uuid: true,
              name: true,
              description: true,
              attachment: true,
              user: {
                firstname: true,
                lastname: true,
                email: true,
                phone: true
              }
            }
          },
          where: {
            status: StatusEnum.ACCEPT,
            receiver_id: request.user['sub'],
            role_name: role
          },
          relations: {
            petition: {
              user: true
            }
          }
        });

        if(hire?.length > 0) {
          petition = hire.map(
            data => ({ 
              uuid: data?.petition?.uuid, 
              name: data?.petition?.name, 
              description: data?.petition?.description, 
              attachment: data?.petition?.attachment,
              user: data?.petition?.user,
              // role: data?.petition?.user?.role
            })
          )
        }
        return petition;
      }

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  findOne(id: number) {
    return `This action returns a #${id} petition`;
  }

  async findOneById(uuid: string, request: Request) {
    try {
      let result = {
        data: {},
        petitionGatherer: [],
        petitionValidator: [],
      };

      const role = await Helper.role(request.user['sub']); // Using the helper service to get the role
      
      result.data = await this.repository.findOne({
        select: {
          user: {
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            address: true
          }
        },
        where: { uuid: uuid },
        relations: {
          user: true
        }
      });

      // list of attached petition gatherer and validator
      if (
        role == Role.ADMIN ||
        role == Role.SITE_MANAGER || 
        role == Role.PETITION_MANAGEMENT_COMPANY || 
        role == Role.BALLOT_OR_INITIATIVE_COMMITTEE ||
        role == Role.POLITICAL_CANDIDATE
      ) {
        if(result.data) {
          result.petitionGatherer = await this.hireRepository.find({
            select: {
              receiver_id: true,
              role_name: true,
              sender: {
                id: true,
                firstname: true,
                lastname: true,
                age: true,
                gender: true,
                email: true,
                phone: true,
                address: true,
                company: true
              },
              receiver: {
                id: true,
                firstname: true,
                lastname: true,
                age: true,
                gender: true,
                email: true,
                phone: true,
                address: true,
                company: true
              }
            },
            where: {
              petition_id: result.data['id'],
              role_name: Role.PETITION_GATHERER,
              status: StatusEnum.ACCEPT
            },
            relations: {
              sender: true,
              receiver: true
            }
          });

          result.petitionValidator = await this.hireRepository.find({
            select: {
              receiver_id: true,
              role_name: true,
              sender: {
                id: true,
                firstname: true,
                lastname: true,
                age: true,
                gender: true,
                email: true,
                phone: true,
                address: true,
                company: true
              },
              receiver: {
                id: true,
                firstname: true,
                lastname: true,
                age: true,
                gender: true,
                email: true,
                phone: true,
                address: true,
                company: true
              }
            },
            where: {
              petition_id: result.data['id'],
              role_name: Role.PETITION_VALIDATOR,
              status: StatusEnum.ACCEPT
            },
            relations: {
              sender: true,
              receiver: true
            }
          });
        }
      }

      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async gatherers(uuid: string) {
    try {
      return await this.repository.find({ where: { uuid: uuid } })
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updatePetitionDto: UpdatePetitionDto) {
    return `This action updates a #${id} petition`;
  }

  remove(id: number) {
    return `This action removes a #${id} petition`;
  }

  async upload(uploadPetitionDto: UploadPetitionDto, request: Request, file) {
    try {
      if (!file) throw new HttpException('Attachment is missing.!', HttpStatus.UNPROCESSABLE_ENTITY);

      const petition = await this.repository.findOne({
        where: {
          uuid: uploadPetitionDto?.uuid
        }
      });
      if(! petition) throw new HttpException('Invalid petition!', HttpStatus.UNPROCESSABLE_ENTITY);

      const signedPetitions = new SignedPetitions();

      signedPetitions.petition_id = petition?.id;
      signedPetitions.created_by = request?.user['sub'];
      signedPetitions.validate_no = 25;
      signedPetitions.attachment = 'signed-petitions/' + file['filename'];

      let signedPetition = await this.signedPetitionRepository.save(signedPetitions);

      return signedPetition;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}