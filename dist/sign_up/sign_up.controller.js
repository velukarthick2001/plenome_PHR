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
exports.SignUpController = void 0;
const common_1 = require("@nestjs/common");
const sign_up_service_1 = require("./sign_up.service");
const sign_up_entity_1 = require("./entities/sign_up.entity");
let SignUpController = class SignUpController {
    constructor(signUpService) {
        this.signUpService = signUpService;
    }
    check_old_or_new(userEntity) {
        return this.signUpService.check_old_or_new(userEntity);
    }
    verifyOld(userEntity) {
        return this.signUpService.verifyOld(userEntity);
    }
    createnew(userEntity) {
        return this.signUpService.createnew(userEntity);
    }
    findsettings(id) {
        return this.signUpService.findsettings(+id);
    }
    updatePassword(id, userEntity) {
        return this.signUpService.updatePassword(+id, userEntity);
    }
    updateStettings(id, userEntity) {
        return this.signUpService.updateStettings(+id, userEntity);
    }
    remove(id) {
        return this.signUpService.remove(+id);
    }
};
exports.SignUpController = SignUpController;
__decorate([
    (0, common_1.Post)('/check'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_entity_1.User]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "check_old_or_new", null);
__decorate([
    (0, common_1.Post)('/old'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_entity_1.User]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "verifyOld", null);
__decorate([
    (0, common_1.Post)('/new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_entity_1.User]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "createnew", null);
__decorate([
    (0, common_1.Get)('/settings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "findsettings", null);
__decorate([
    (0, common_1.Patch)('/updatePassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sign_up_entity_1.User]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Patch)('/updateSettings/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, sign_up_entity_1.User]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "updateStettings", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SignUpController.prototype, "remove", null);
exports.SignUpController = SignUpController = __decorate([
    (0, common_1.Controller)('sign_up'),
    __metadata("design:paramtypes", [sign_up_service_1.SignUpService])
], SignUpController);
//# sourceMappingURL=sign_up.controller.js.map