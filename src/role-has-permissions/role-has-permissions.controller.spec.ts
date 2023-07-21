import { Test, TestingModule } from '@nestjs/testing';
import { RoleHasPermissionsController } from './role-has-permissions.controller';
import { RoleHasPermissionsService } from './role-has-permissions.service';

describe('RoleHasPermissionsController', () => {
  let controller: RoleHasPermissionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleHasPermissionsController],
      providers: [RoleHasPermissionsService],
    }).compile();

    controller = module.get<RoleHasPermissionsController>(RoleHasPermissionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
