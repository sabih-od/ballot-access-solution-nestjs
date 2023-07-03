import { Module } from '@nestjs/common';
import { ModelHasRolesService } from './model-has-roles.service';
import { ModelHasRolesController } from './model-has-roles.controller';

@Module({
  controllers: [ModelHasRolesController],
  providers: [ModelHasRolesService]
})
export class ModelHasRolesModule {}
