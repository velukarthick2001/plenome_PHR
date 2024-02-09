import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalCredentialsService } from './hospital_credentials.service';
import { HospitalCredential } from './entities/hospital_credential.entity';

@Controller('hospital_credentials')
export class HospitalCredentialsController {
  constructor(private readonly hospitalCredentialsService: HospitalCredentialsService) {}

  @Post()
  create(@Body() credentialEntity: HospitalCredential) {
    return this.hospitalCredentialsService.create(credentialEntity);
  }

  @Get()
  findAll() {
    return this.hospitalCredentialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalCredentialsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() credentialEntity: HospitalCredential) {
    return this.hospitalCredentialsService.update(+id, credentialEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalCredentialsService.remove(+id);
  }
}
