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
exports.HospitalCredentialsController = void 0;
const common_1 = require("@nestjs/common");
const hospital_credentials_service_1 = require("./hospital_credentials.service");
const hospital_credential_entity_1 = require("./entities/hospital_credential.entity");
let HospitalCredentialsController = class HospitalCredentialsController {
    constructor(hospitalCredentialsService) {
        this.hospitalCredentialsService = hospitalCredentialsService;
    }
    create(credentialEntity) {
        return this.hospitalCredentialsService.create(credentialEntity);
    }
    findAll() {
        return this.hospitalCredentialsService.findAll();
    }
    findOne(id) {
        return this.hospitalCredentialsService.findOne(+id);
    }
    update(id, credentialEntity) {
        return this.hospitalCredentialsService.update(+id, credentialEntity);
    }
    remove(id) {
        return this.hospitalCredentialsService.remove(+id);
    }
};
exports.HospitalCredentialsController = HospitalCredentialsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [hospital_credential_entity_1.HospitalCredential]),
    __metadata("design:returntype", void 0)
], HospitalCredentialsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HospitalCredentialsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalCredentialsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, hospital_credential_entity_1.HospitalCredential]),
    __metadata("design:returntype", void 0)
], HospitalCredentialsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HospitalCredentialsController.prototype, "remove", null);
exports.HospitalCredentialsController = HospitalCredentialsController = __decorate([
    (0, common_1.Controller)('hospital_credentials'),
    __metadata("design:paramtypes", [hospital_credentials_service_1.HospitalCredentialsService])
], HospitalCredentialsController);
//# sourceMappingURL=hospital_credentials.controller.js.map