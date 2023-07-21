import { Test, TestingModule } from '@nestjs/testing';
import { ResetCodePasswordsController } from './reset-code-passwords.controller';
import { ResetCodePasswordsService } from './reset-code-passwords.service';

describe('ResetCodePasswordsController', () => {
  let controller: ResetCodePasswordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResetCodePasswordsController],
      providers: [ResetCodePasswordsService],
    }).compile();

    controller = module.get<ResetCodePasswordsController>(ResetCodePasswordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
