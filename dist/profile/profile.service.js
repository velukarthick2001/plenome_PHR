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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ProfileService = class ProfileService {
    constructor(connection) {
        this.connection = connection;
    }
    async create(PatientEntity) {
        console.log(PatientEntity, "111");
        const [checkOld] = await this.connection.query(`select * from  patients WHERE mobileno = ?`, [PatientEntity.mobileno]);
        if (checkOld) {
            return checkOld;
        }
        else {
            const result = await this.connection.query('INSERT INTO patients (patient_name,image,dob,email,gender,mobileno,blood_bank_product_id,emergency_mobile_no,address,state_code,district_code,pincode,ABHA_number) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)', [PatientEntity.patient_name,
                PatientEntity.image,
                PatientEntity.dob,
                PatientEntity.email,
                PatientEntity.gender,
                PatientEntity.mobileno,
                PatientEntity.blood_bank_product_id,
                PatientEntity.emergency_mobile_no,
                PatientEntity.address,
                PatientEntity.state_code,
                PatientEntity.district_code,
                PatientEntity.pincode,
                PatientEntity.ABHA_number
            ]);
            console.log("000");
            const user = await this.connection.query('update users set users.user_id = ? where users.username = ?', [result.insertId, PatientEntity.mobileno]);
            console.log(user, "777");
            return [{ "data": { "id  ": result.insertId,
                        "status": "success",
                        "messege": "Patient Profile added successfully",
                        "inserted_data": await this.connection.query('SELECT * FROM patients WHERE id = ?', [result.insertId])
                    } }];
        }
    }
    async findOne(id) {
        const [result] = await this.connection.query(`select patients.id,patients.patient_name,patients.dob,patients.gender,patients.email,
      patients.emergency_mobile_no,patients.address,patients.state_code,patients.district_code,patients.ABHA_number,
      patients.blood_bank_product_id,blood_bank_products.name blood_group,patients.pincode
      from patients left join
       blood_bank_products on blood_bank_products.id = patients.blood_bank_product_id where patients.id = ?`, [id]);
        let Emergencyno = result.emergency_mobile_no;
        let EmergencynoTrimmedMobileno;
        if (Emergencyno.length > 10) {
            console.log(Emergencyno.length, "AdminPatientMobileNo.length");
            EmergencynoTrimmedMobileno = Emergencyno.startsWith('91') ? Emergencyno.slice(2) : Emergencyno;
        }
        else {
            EmergencynoTrimmedMobileno = Emergencyno;
        }
        let out = [{
                "id": result.id,
                "patient_name": result.patient_name,
                "dob": result.dob,
                "gender": result.gender,
                "email": result.email,
                "address": result.address,
                "state_code": result.state_code,
                "district_code": result.district_code,
                "ABHA_number": result.ABHA_number,
                "blood_bank_product_id": result.blood_bank_product_id,
                "blood_group": result.blood_group,
                "pincode": result.pincode,
                "emergency_mobile_no": EmergencynoTrimmedMobileno
            }
        ];
        return [{ "data": {
                    "status": "success",
                    "messege": "Patient Profile fetched successfully",
                    "profile": out
                } }];
    }
    async update(id, PatientEntity) {
        try {
            const result = await this.connection.query('UPDATE patients SET patient_name =?,dob =?,email =?,gender =?,blood_bank_product_id =?,emergency_mobile_no =?,address =?,state_code =?,district_code =?,pincode =?,ABHA_number =? WHERE id = ?', [PatientEntity.patient_name,
                PatientEntity.dob,
                PatientEntity.email,
                PatientEntity.gender,
                PatientEntity.blood_bank_product_id,
                PatientEntity.emergency_mobile_no,
                PatientEntity.address,
                PatientEntity.state_code,
                PatientEntity.district_code,
                PatientEntity.pincode,
                PatientEntity.ABHA_number,
                id
            ]);
            return [{ "data": {
                        status: "success",
                        "messege": "Patient details updated successfully inserted",
                        "updated_values": await this.connection.query('SELECT * FROM patients WHERE id = ?', [id])
                    } }];
        }
        catch (error) {
            return [
                { status: "failed",
                    "messege": "cannot update patient profile",
                    "error": error
                }
            ];
        }
    }
    async updateAbhaNumber(id, PatientEntity) {
        try {
            const result = await this.connection.query('UPDATE patients SET ABHA_number =? WHERE id = ?', [
                PatientEntity.ABHA_number,
                id
            ]);
            return [{ "data": {
                        status: "success",
                        "messege": "AbhaNumber updated successfully inserted",
                        "updated_values": await this.connection.query('SELECT * FROM patients WHERE id = ?', [id])
                    } }];
        }
        catch (error) {
            return [
                { status: "failed",
                    "messege": "cannot update Abha Number to patient profile",
                    "error": error
                }
            ];
        }
    }
    async remove(id) {
        const result = await this.connection.query('DELETE FROM patients WHERE id = ?', [id]);
        return [{
                "status": "success",
                "message": " id: " + id + " deleted successfully"
            }
        ];
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ProfileService);
//# sourceMappingURL=profile.service.js.map