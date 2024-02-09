import { Module } from '@nestjs/common';
import { PatientRecordsService } from './patient_records.service';
import { PatientRecordsController } from './patient_records.controller';

@Module({
  controllers: [PatientRecordsController],
  providers: [PatientRecordsService],
})
export class PatientRecordsModule {}
