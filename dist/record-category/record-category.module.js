"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordCategoryModule = void 0;
const common_1 = require("@nestjs/common");
const record_category_service_1 = require("./record-category.service");
const record_category_controller_1 = require("./record-category.controller");
let RecordCategoryModule = class RecordCategoryModule {
};
exports.RecordCategoryModule = RecordCategoryModule;
exports.RecordCategoryModule = RecordCategoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [record_category_controller_1.RecordCategoryController],
        providers: [record_category_service_1.RecordCategoryService],
    })
], RecordCategoryModule);
//# sourceMappingURL=record-category.module.js.map