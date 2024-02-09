"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HospitalController = void 0;
const common_1 = require("@nestjs/common");
const hospital_service_1 = require("./hospital.service");
let HospitalController = class HospitalController {
    constructor(hospitalService) {
        this.hospitalService = hospitalService;
    }
    async getHospitalDetails(name) {
        if (name) {
            return this.hospitalService.searchHospitalsByName(name);
        }
        else {
            return this.hospitalService.getHospitalDetails();
        }
    }
    async getHospitalDetailsById(id) {
        return this.hospitalService.getHospitalDetailsById(id);
    }
    async getHospitalAppointmentHistoryById(patient_id, hospitalId) {
        const appointmentHistory = await this.hospitalService.getHospitalAppointmentHistoryById(patient_id, hospitalId);
        return appointmentHistory;
    }
    async getHospitalDoctorsById(hospitalId) {
        const hospitalDoctors = await this.hospitalService.getHospitalDoctorsById(hospitalId);
        return hospitalDoctors;
    }
};
exports.HospitalController = HospitalController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalDetailsById", null);
__decorate([
    (0, common_1.Get)('appointment-history/:patient_id'),
    __param(0, (0, common_1.Param)('patient_id')),
    __param(1, (0, common_1.Query)('hospitalId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalAppointmentHistoryById", null);
__decorate([
    (0, common_1.Get)('/Hosdoctors/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], HospitalController.prototype, "getHospitalDoctorsById", null);
exports.HospitalController = HospitalController = __decorate([
    (0, common_1.Controller)('hospitals'),
    __metadata("design:paramtypes", [hospital_service_1.HospitalService])
], HospitalController);
//# sourceMappingURL=hospital.controller.js.map