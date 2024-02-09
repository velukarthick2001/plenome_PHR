import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientRecordsService } from './patient_records.service';
import { PatientRecord } from './entities/patient_record.entity';

@Controller('patient_records')
export class PatientRecordsController {
  constructor(private readonly patientRecordsService: PatientRecordsService) {}

  @Post()
  create(@Body() recordEntity: PatientRecord) {
    return this.patientRecordsService.create(recordEntity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("entering");
    
    return this.patientRecordsService.findOne(+id);
  }

  @Get(':id/:type_id')
  findByType(@Param('id') id: number,@Param('type_id') type_id: number) {
    return this.patientRecordsService.findByType(id,type_id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientRecordsService.remove(+id);
  }
}
