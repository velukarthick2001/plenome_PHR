import { Module } from '@nestjs/common';
import { ServiceDoctorsService } from './service_doctors.service';
import { ServiceDoctorsController } from './service_doctors.controller';

@Module({
  controllers: [ServiceDoctorsController],
  providers: [ServiceDoctorsService],
})
export class ServiceDoctorsModule {}
