import { Module } from '@nestjs/common';
import { HospitalCredentialsService } from './hospital_credentials.service';
import { HospitalCredentialsController } from './hospital_credentials.controller';

@Module({
  controllers: [HospitalCredentialsController],
  providers: [HospitalCredentialsService],
})
export class HospitalCredentialsModule {}
