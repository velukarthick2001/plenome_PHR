import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() AppointmentEntity: Appointment) {
    return this.appointmentService.create(AppointmentEntity);
  }

  @Get('/doctors')
  findDoctors(@Query('speciality') speciality: string,@Query('search') search: string) {
    return this.appointmentService.findDoctors(speciality,search);
  }

  @Get('/past/:id')
  findAllPast(@Param('id') id: string) {
    return this.appointmentService.findAllPast(+id);
  }

  @Get('/upcoming/:id')
  findAllUpcoming(@Param('id') id: string) {
    return this.appointmentService.findAllUpcoming(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() AppointmentEntity: Appointment) {
    return this.appointmentService.update(+id, AppointmentEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
