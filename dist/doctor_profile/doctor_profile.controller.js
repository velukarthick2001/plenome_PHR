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
exports.DoctorProfileController = void 0;
const common_1 = require("@nestjs/common");
const doctor_profile_service_1 = require("./doctor_profile.service");
const doctor_profile_entity_1 = require("./entities/doctor_profile.entity");
let DoctorProfileController = class DoctorProfileController {
    constructor(doctorProfileService) {
        this.doctorProfileService = doctorProfileService;
    }
    create(StaffReview) {
        return this.doctorProfileService.create(StaffReview);
    }
    findOne(id) {
        return this.doctorProfileService.findOne(+id);
    }
    findAbout(id) {
        return this.doctorProfileService.findAbout(+id);
    }
    findshift(id, date) {
        return this.doctorProfileService.findCalender(+id, date);
    }
    findhos(id) {
        return this.doctorProfileService.finddocHos(+id);
    }
    findstats(id) {
        return this.doctorProfileService.findDocRating(+id);
    }
    findreview(id) {
        return this.doctorProfileService.findDocReview(+id);
    }
};
exports.DoctorProfileController = DoctorProfileController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [doctor_profile_entity_1.DoctorProfile]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('/about/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findAbout", null);
__decorate([
    (0, common_1.Get)('/calender/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findshift", null);
__decorate([
    (0, common_1.Get)('/docHos/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findhos", null);
__decorate([
    (0, common_1.Get)('/stats/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findstats", null);
__decorate([
    (0, common_1.Get)('/review/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], DoctorProfileController.prototype, "findreview", null);
exports.DoctorProfileController = DoctorProfileController = __decorate([
    (0, common_1.Controller)('doctor_profile'),
    __metadata("design:paramtypes", [doctor_profile_service_1.DoctorProfileService])
], DoctorProfileController);
//# sourceMappingURL=doctor_profile.controller.js.map