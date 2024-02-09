import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BloodGroupService } from './blood-group.service';

@Controller('blood_group')
export class BloodGroupController {
  constructor(private readonly bloodGroupService: BloodGroupService) {}


  @Get()
  findAll() {
    return this.bloodGroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bloodGroupService.findOne(+id);
  }

}
