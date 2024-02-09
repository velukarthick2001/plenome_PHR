"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const sign_up_module_1 = require("./sign_up/sign_up.module");
const profile_module_1 = require("./profile/profile.module");
const appointment_module_1 = require("./appointment/appointment.module");
const hospital_credentials_module_1 = require("./hospital_credentials/hospital_credentials.module");
const blood_group_module_1 = require("./blood-group/blood-group.module");
const service_doctors_module_1 = require("./service_doctors/service_doctors.module");
const doctor_profile_module_1 = require("./doctor_profile/doctor_profile.module");
const languages_module_1 = require("./languages/languages.module");
const hospital_module_1 = require("./Hospital/hospital.module");
const record_category_module_1 = require("./record-category/record-category.module");
const patient_records_module_1 = require("./patient_records/patient_records.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                "type": "mysql",
                "host": "13.200.35.19",
                "port": 3306,
                "username": "root",
                "password": "pn::host-cloudDB1#2023",
                "database": "plenome_ADMIN",
                "entities": ["dist/**/*.entity{.ts,.js}"],
                "synchronize": false
            }),
            sign_up_module_1.SignUpModule,
            profile_module_1.ProfileModule,
            appointment_module_1.AppointmentModule,
            hospital_credentials_module_1.HospitalCredentialsModule,
            blood_group_module_1.BloodGroupModule,
            service_doctors_module_1.ServiceDoctorsModule,
            doctor_profile_module_1.DoctorProfileModule,
            languages_module_1.LanguagesModule,
            hospital_module_1.HospitalModule,
            record_category_module_1.RecordCategoryModule,
            patient_records_module_1.PatientRecordsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map