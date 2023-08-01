import { Test, TestingModule } from '@nestjs/testing';
import { HiresService } from './hires.service';

describe('HiresService', () => {
  let service: HiresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HiresService],
    }).compile();

    service = module.get<HiresService>(HiresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
