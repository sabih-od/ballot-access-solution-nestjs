import { Module } from '@nestjs/common';
import { ResetCodePasswordsService } from './reset-code-passwords.service';
import { ResetCodePasswordsController } from './reset-code-passwords.controller';

@Module({
  controllers: [ResetCodePasswordsController],
  providers: [ResetCodePasswordsService]
})
export class ResetCodePasswordsModule {}
