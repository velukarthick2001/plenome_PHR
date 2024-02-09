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
exports.PatientRecordsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let PatientRecordsService = class PatientRecordsService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(recordEntity) {
        const recordEnter = await this.connection.query(`insert into patient_records (patient_id,record_name,
      record_type_id,files,tags)
     values(?,?,?,?,?)`, [recordEntity.patient_id,
            recordEntity.record_name,
            recordEntity.record_type_id,
            recordEntity.files,
            JSON.stringify(recordEntity.tags)
        ]);
        console.log(recordEnter, "recordEnter");
        return [{
                "status": "success",
                "messege": "Patient record uploaded successfully"
            }];
    }
    async findOne(id) {
        console.log("aabbcc");
        const getAllRecords = await this.connection.query(`select * from patient_records where patient_id = ?`, [id]);
        return getAllRecords;
    }
    async findByType(id, type_id) {
        console.log("aabbccdd");
        const getAllRecords = await this.connection.query(`select * from patient_records where patient_id = ?
     and record_type_id = ?`, [id, type_id]);
        return getAllRecords;
    }
    async remove(id) {
        const delRecords = await this.connection.query(`delete from patient_records where id = ?`, [id]);
        return `This action removes a #${id} patientRecord`;
    }
};
exports.PatientRecordsService = PatientRecordsService;
exports.PatientRecordsService = PatientRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], PatientRecordsService);
//# sourceMappingURL=patient_records.service.js.map