import { Module } from '@nestjs/common';
import { DoctorProfileService } from './doctor_profile.service';
import { DoctorProfileController } from './doctor_profile.controller';

@Module({
  controllers: [DoctorProfileController],
  providers: [DoctorProfileService],
})
export class DoctorProfileModule {}
