import { Test, TestingModule } from '@nestjs/testing';
import { ResetCodePasswordsService } from './reset-code-passwords.service';

describe('ResetCodePasswordsService', () => {
  let service: ResetCodePasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResetCodePasswordsService],
    }).compile();

    service = module.get<ResetCodePasswordsService>(ResetCodePasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
