
// hospital.controller.ts

import { Controller, Get, Param, Query } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospitals')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}
  
  
  @Get()
  async getHospitalDetails(@Query('name') name?: string) {
    if (name) {
      // If name is provided, perform search
      return this.hospitalService.searchHospitalsByName(name);
    } else {
      // If name is not provided, fetch overall details
      return this.hospitalService.getHospitalDetails();
    }
  }


  @Get(':id')
async getHospitalDetailsById(@Param('id') id: number) {
  return this.hospitalService.getHospitalDetailsById(id);
}

@Get('appointment-history/:patient_id')
  async getHospitalAppointmentHistoryById(@Param('patient_id') patient_id: number,@Query('hospitalId')hospitalId:number) {
    const appointmentHistory = await this.hospitalService.getHospitalAppointmentHistoryById(patient_id,hospitalId);
    return appointmentHistory;
  }

  @Get('/Hosdoctors/:id')
  async getHospitalDoctorsById(@Param('id') hospitalId: number) {
    const hospitalDoctors = await this.hospitalService.getHospitalDoctorsById(hospitalId);
    return hospitalDoctors;
  }


}
