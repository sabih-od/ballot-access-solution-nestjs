import { Test, TestingModule } from '@nestjs/testing';
import { SignedPetitionsController } from './signed-petitions.controller';
import { SignedPetitionsService } from './signed-petitions.service';

describe('SignedPetitionsController', () => {
  let controller: SignedPetitionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SignedPetitionsController],
      providers: [SignedPetitionsService],
    }).compile();

    controller = module.get<SignedPetitionsController>(SignedPetitionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
