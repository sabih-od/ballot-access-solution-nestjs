import { Module } from '@nestjs/common';
import { SignedPetitionsService } from './signed-petitions.service';
import { SignedPetitionsController } from './signed-petitions.controller';

@Module({
  controllers: [SignedPetitionsController],
  providers: [SignedPetitionsService]
})
export class SignedPetitionsModule {}
