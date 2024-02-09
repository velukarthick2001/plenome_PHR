import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Patient } from './entities/profile.entity';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() PatientEntity: Patient) {
    return this.profileService.create(PatientEntity);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() PatientEntity: Patient) {
    return this.profileService.update(+id, PatientEntity);
  }
  @Patch('/abhaNumber_update/:id')
  updateAbha(@Param('id') id: string, @Body() PatientEntity: Patient) {
    return this.profileService.updateAbhaNumber(id, PatientEntity);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(+id);
  }
}
