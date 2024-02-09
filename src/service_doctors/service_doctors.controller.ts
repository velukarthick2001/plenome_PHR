import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceDoctorsService } from './service_doctors.service';

@Controller('service_doctors')
export class ServiceDoctorsController {
  constructor(private readonly serviceDoctorsService: ServiceDoctorsService) {}

  

  @Get()
  findAll(@Query('date') date: string,@Query('gender') gender: string,
  @Query('speciality') speciality: string,@Query('language') language: string) {
    return this.serviceDoctorsService.findAll(date,gender,speciality,language);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceDoctorsService.findOne(+id);
  }

}
