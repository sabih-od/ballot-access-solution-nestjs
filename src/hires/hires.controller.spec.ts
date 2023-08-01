import { Test, TestingModule } from '@nestjs/testing';
import { HiresController } from './hires.controller';
import { HiresService } from './hires.service';

describe('HiresController', () => {
  let controller: HiresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HiresController],
      providers: [HiresService],
    }).compile();

    controller = module.get<HiresController>(HiresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
