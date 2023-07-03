import { Test, TestingModule } from '@nestjs/testing';
import { ModelHasRolesService } from './model-has-roles.service';

describe('ModelHasRolesService', () => {
  let service: ModelHasRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModelHasRolesService],
    }).compile();

    service = module.get<ModelHasRolesService>(ModelHasRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
