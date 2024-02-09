import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpModule } from './sign_up/sign_up.module';
import { ProfileModule } from './profile/profile.module';
import { AppointmentModule } from './appointment/appointment.module';
import { HospitalCredentialsModule } from './hospital_credentials/hospital_credentials.module';
import { BloodGroupModule } from './blood-group/blood-group.module';
import { ServiceDoctorsModule } from './service_doctors/service_doctors.module';
import { DoctorProfileModule } from './doctor_profile/doctor_profile.module';
import { LanguagesModule } from './languages/languages.module';
import { HospitalModule } from './Hospital/hospital.module';
import { RecordCategoryModule } from './record-category/record-category.module';
import { PatientRecordsModule } from './patient_records/patient_records.module';

@Module({
  imports: [ ConfigModule.forRoot(),
    
    TypeOrmModule.forRoot({
    "type": "mysql", 
    // "host": "localhost",
    "host": "13.200.35.19",
    "port": 3306,
    "username": "root", 
    "password": "pn::host-cloudDB1#2023",
    // "password":"dev@PASSWORD2023",
    "database":"plenome_ADMIN",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": false
}),
    
    SignUpModule,
    
    ProfileModule,
    
    AppointmentModule,
    
    HospitalCredentialsModule,
    
    BloodGroupModule,
    
    ServiceDoctorsModule,
    
    DoctorProfileModule,
    
    LanguagesModule,
    HospitalModule,
    RecordCategoryModule,
    PatientRecordsModule
    
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
