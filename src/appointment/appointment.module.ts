import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { DynamicDatabaseService } from 'src/dynamic_db.service';

@Module({
  controllers: [AppointmentController],
  providers: [AppointmentService,DynamicDatabaseService],
})
export class AppointmentModule {}
