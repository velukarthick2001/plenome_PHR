"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpModule = void 0;
const common_1 = require("@nestjs/common");
const sign_up_service_1 = require("./sign_up.service");
const sign_up_controller_1 = require("./sign_up.controller");
let SignUpModule = class SignUpModule {
};
exports.SignUpModule = SignUpModule;
exports.SignUpModule = SignUpModule = __decorate([
    (0, common_1.Module)({
        controllers: [sign_up_controller_1.SignUpController],
        providers: [sign_up_service_1.SignUpService],
    })
], SignUpModule);
//# sourceMappingURL=sign_up.module.js.map