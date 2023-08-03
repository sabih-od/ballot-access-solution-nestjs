import { Test, TestingModule } from '@nestjs/testing';
import { SignedPetitionsService } from './signed-petitions.service';

describe('SignedPetitionsService', () => {
  let service: SignedPetitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignedPetitionsService],
    }).compile();

    service = module.get<SignedPetitionsService>(SignedPetitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
