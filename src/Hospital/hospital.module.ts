import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HospitalEntity } from './entities/hospital.entity';
import { HospitalController } from './hospital.controller';
import { HospitalService } from './hospital.service';

@Module({
  imports: [TypeOrmModule.forFeature([HospitalEntity])],
  controllers: [HospitalController],
  providers: [HospitalService],
})
export class HospitalModule {}
