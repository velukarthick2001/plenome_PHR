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
exports.ServiceDoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let ServiceDoctorsService = class ServiceDoctorsService {
    constructor(connection) {
        this.connection = connection;
    }
    async findAll(date, gender, speciality, language) {
        let query = `SELECT 
  CONCAT(staff.name, " ", staff.surname," (",staff.employee_id,")") AS doctor_name,
  staff.id AS doctor_id,
  hospitals.plenome_id hospital_id,
  hospitals.hospital_name,
  staff.work_exp AS experience,
  ROUND(((ROUND((SELECT AVG(staff_rating.rating) FROM staff_rating WHERE staff_rating.staff_id = staff.id), 1) / 5) * 100), 0) AS rating,
  GROUP_CONCAT(DISTINCT specialist.specialist_name) AS specialist_names,
  GROUP_CONCAT(DISTINCT CONCAT(start_time, " - ", end_time,"(",doctor_shift.id,")") ORDER BY doctor_shift.id) AS 'timings(shift_id)',
  doctor_shift.day,
  GROUP_CONCAT(DISTINCT languages.language) AS languagesknown,
  GROUP_CONCAT( distinct doctor_shift.id) AS shift_id,
  doctor_shift.global_shift_id,
  shift_details.charge_id,
    (select round((charges.standard_charge+(charges.standard_charge*((tax_category.percentage)/100))),2) amount from 
charges join tax_category on charges.tax_category_id = tax_category.id
where charges.id = shift_details.charge_id) amount    
FROM staff 
LEFT JOIN hospital_staffs ON hospital_staffs.staff_id = staff.id
LEFT JOIN hospitals ON hospitals.plenome_id = hospital_staffs.hospital_id
LEFT JOIN staff_roles ON staff.id = staff_roles.staff_id
LEFT JOIN doctor_shift ON doctor_shift.staff_id = staff.id
LEFT JOIN shift_details on shift_details.staff_id = staff.id
LEFT JOIN specialist ON JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON), '$') = 1
LEFT JOIN languages ON JSON_CONTAINS(staff.languagesKnown, CAST(languages.id AS JSON), '$') = 1
where staff.id `;
        let values = [];
        if (date) {
            query += ` and  doctor_shift.day = dayname(?) `;
            values.push(date);
        }
        else {
            const currentDate = new Date();
            query += ` and doctor_shift.day = dayname(?) `;
            values.push(currentDate);
        }
        if (gender) {
            query += ` and staff.gender = ?`;
            values.push(gender);
        }
        let endQuery = ` GROUP BY doctor_id, doctor_name, plenome_id, hospital_name, doctor_shift.day, doctor_shift.global_shift_id,charge_id    `;
        let final = query + endQuery;
        if (speciality || language) {
            final += ` HAVING `;
            if (speciality && language) {
                if (speciality) {
                    final += `  FIND_IN_SET( ?, specialist_names) > 0 `;
                    values.push(speciality);
                }
                if (language) {
                    final += ` AND FIND_IN_SET( ?, languagesknown) > 0 `;
                    values.push(language);
                }
            }
            else {
                if (speciality) {
                    final += `  FIND_IN_SET( ?, specialist_names) > 0 `;
                    values.push(speciality);
                }
                if (language) {
                    final += `  FIND_IN_SET( ?, languagesknown) > 0 `;
                    values.push(language);
                }
            }
        }
        console.log(final, "final");
        console.log(values, "values");
        const get_all_doctors = await this.connection.query(final, values);
        return get_all_doctors;
    }
    findOne(id) {
        return `This action returns a #${id} serviceDoctor`;
    }
};
exports.ServiceDoctorsService = ServiceDoctorsService;
exports.ServiceDoctorsService = ServiceDoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], ServiceDoctorsService);
//# sourceMappingURL=service_doctors.service.js.map