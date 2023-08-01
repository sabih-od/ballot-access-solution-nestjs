import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateHireDto } from './dto/create-hire.dto';
import { UpdateHireDto } from './dto/update-hire.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Petitions } from 'src/petitions/entities/petitions.entity';
import { Hires, StatusEnum } from './entities/hires.entity';
import { Request } from 'express';
import { Helper } from 'src/helper';

@Injectable()
export class HiresService {
  constructor(
    @InjectRepository(Petitions)
    private petitionRepository: Repository<Petitions>,

    @InjectRepository(Hires)
    private repository: Repository<Hires>,
  ) {}
  
  async create(payload, request): Promise<any> {
    try {
      // check this petition were create auth user
      const validPetition = await this.validPetition(request, payload);
      if(!validPetition) throw new HttpException('Invalid petition!', HttpStatus.UNPROCESSABLE_ENTITY);

      // check requested user has valid role
      const validRole = await this.validRole(payload);
      if(!validRole) throw new HttpException('User role is wrong!', HttpStatus.UNPROCESSABLE_ENTITY);

      // check request not exist!
      const requestExist = await this.requestExist(request, payload);
      if(!requestExist) {

        const petition = await this.petitionRepository.findOne({
          where: { uuid: payload.petition_uuid }
        });

        if(petition) {
          const hires = new Hires();

          // hires.petition_id = payload.petition_id;
          hires.petition_id = petition.id;
          hires.role_name = payload.role_name;
          hires.receiver_id = payload.receiver_id;
          hires.status = StatusEnum.NOT_ACCEPT;
          hires.sender_id = request.user['sub'];

          return this.repository.save(hires);
        }
      }
      else {
        throw new HttpException("You've already send request!", HttpStatus.UNPROCESSABLE_ENTITY);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all hires`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hire`;
  }

  update(id: number, updateHireDto: UpdateHireDto) {
    return `This action updates a #${id} hire`;
  }

  remove(id: number) {
    return `This action removes a #${id} hire`;
  }

  request(request) {
    return this.repository.find({
      select: {
        id: true,
        sender_id: true,
        sender: {
          id: true,
          firstname: true,
          lastname: true,
          age: true,
          gender: true,
          email: true,
          phone: true,
          address: true,
          company: true,
          modelHasRoles: {
            model_id: true,
            model_type: true,
            role_id: true,
            roles: {
              name: true
            }
          }
        },
        petition: {
          uuid: true,
          name: true,
          description: true,
          attachment: true,
        }
      },
      where: {
        receiver_id: request?.user['sub'],
        status: StatusEnum.NOT_ACCEPT,
        sender: {
          modelHasRoles: {
            model_type: 'User'
          }
        }
      },
      relations: {
        sender: {
          modelHasRoles: {
            roles: true
          }
        },
        petition: true
      }
    });
  }

  async accept(request, payload) {
    try {      
      const validAccept = await this.validAccept(request, payload);
      if(!validAccept) throw new HttpException('Invalid accept!', HttpStatus.UNPROCESSABLE_ENTITY);

      const acceptRequest = await this.repository.findOneBy({
        id: payload?.id,
      });
      acceptRequest.status = StatusEnum.ACCEPT;

      return this.repository.save(acceptRequest)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async validPetition(request, payload) {
    return await this.petitionRepository.findOne({ where: { uuid: payload?.petition_id, user_id: request?.user['sub'] } });
  }

  async validRole(payload) {
    const role = await Helper.role(payload?.receiver_id);
    if(role == payload?.role_name) return true;

    return false;
  }

  async requestExist(request, payload) {
    return await this.repository.findOne({
      where: {
        petition_id: payload?.petition_id,
        role_name: payload?.role_name,
        receiver_id: payload?.receiver_id,
        sender_id: request?.user['sub']
      }
    });
  }

  async validAccept(request, payload) {
    return await this.repository.findOne({
      where: {
        id: payload?.id,
        receiver_id: request?.user['sub']
      }
    });
  }
}