import { Test, TestingModule } from '@nestjs/testing';
import { ModelHasRolesController } from './model-has-roles.controller';
import { ModelHasRolesService } from './model-has-roles.service';

describe('ModelHasRolesController', () => {
  let controller: ModelHasRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ModelHasRolesController],
      providers: [ModelHasRolesService],
    }).compile();

    controller = module.get<ModelHasRolesController>(ModelHasRolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
