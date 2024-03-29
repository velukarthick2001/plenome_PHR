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
exports.PatientRecordsController = void 0;
const common_1 = require("@nestjs/common");
const patient_records_service_1 = require("./patient_records.service");
const patient_record_entity_1 = require("./entities/patient_record.entity");
let PatientRecordsController = class PatientRecordsController {
    constructor(patientRecordsService) {
        this.patientRecordsService = patientRecordsService;
    }
    create(recordEntity) {
        return this.patientRecordsService.create(recordEntity);
    }
    findOne(id) {
        console.log("entering");
        return this.patientRecordsService.findOne(+id);
    }
    findByType(id, type_id) {
        return this.patientRecordsService.findByType(id, type_id);
    }
    remove(id) {
        return this.patientRecordsService.remove(+id);
    }
};
exports.PatientRecordsController = PatientRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [patient_record_entity_1.PatientRecord]),
    __metadata("design:returntype", void 0)
], PatientRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/:type_id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PatientRecordsController.prototype, "findByType", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientRecordsController.prototype, "remove", null);
exports.PatientRecordsController = PatientRecordsController = __decorate([
    (0, common_1.Controller)('patient_records'),
    __metadata("design:paramtypes", [patient_records_service_1.PatientRecordsService])
], PatientRecordsController);
//# sourceMappingURL=patient_records.controller.js.map