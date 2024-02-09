import { Controller, Get, Param, Delete, Query, Post, Body } from '@nestjs/common';
import { DoctorProfileService } from './doctor_profile.service';
import { DoctorProfile } from './entities/doctor_profile.entity';

@Controller('doctor_profile')
export class DoctorProfileController {
  constructor(private readonly doctorProfileService: DoctorProfileService) {}

  @Post()
  create(@Body() StaffReview: DoctorProfile) {
    return this.doctorProfileService.create(StaffReview);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.doctorProfileService.findOne(+id);
  }
  @Get('/about/:id')
  findAbout(@Param('id') id: number) {
    return this.doctorProfileService.findAbout(+id);
  }

  @Get('/calender/:id')
  findshift(@Param('id') id: number,@Query('date') date: string) {
    return this.doctorProfileService.findCalender(+id,date);
  }

  @Get('/docHos/:id')
  findhos(@Param('id') id: number) {
    return this.doctorProfileService.finddocHos(+id);
  }
  @Get('/stats/:id')
  findstats(@Param('id') id: number) {
    return this.doctorProfileService.findDocRating(+id);
  }

  @Get('/review/:id')
  findreview(@Param('id') id: number) {
    return this.doctorProfileService.findDocReview(+id);
  }


}
