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
exports.AppointmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const fs = require("fs");
const dynamic_db_service_1 = require("../dynamic_db.service");
let AppointmentService = class AppointmentService {
    constructor(connection, dynamicDbService) {
        this.connection = connection;
        this.dynamicDbService = dynamicDbService;
    }
    decrypt(encryptedData, privateKey) {
        const decryptedBuffer = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, encryptedData);
        return decryptedBuffer.toString('utf-8');
    }
    async generatePublicKey() {
        try {
            this.privateKey = fs.readFileSync('./src/private_key.pem', 'utf8');
            console.log(this.privateKey, "function ullae");
        }
        catch (error) {
            console.error('Error reading keys:', error);
        }
    }
    async create(AppointmentEntity) {
        let dynamicConnection;
        try {
            try {
                const privateKey = await this.generatePublicKey();
            }
            catch (error) {
                return "error in generating publicKey";
            }
            const hosCredentials = await this.connection.query(`select ip,db_name,db_password,username
  from hospital_credentials where hospital_id = ?`, [AppointmentEntity.Hospital_id]);
            console.log(hosCredentials[0].ip, "1234567890");
            const AdminPatient = await this.connection.query(`select * from patients where id = ?`, [AppointmentEntity.patient_id]);
            console.log(AdminPatient, "..........");
            let AdminPatientMobileNo = AdminPatient[0].mobileno;
            let AdminTrimmedMobileno;
            if (AdminPatientMobileNo.length > 10) {
                console.log(AdminPatientMobileNo.length, "AdminPatientMobileNo.length");
                AdminTrimmedMobileno = AdminPatientMobileNo.startsWith('91') ? AdminPatientMobileNo.slice(2) : AdminPatientMobileNo;
                console.log(AdminPatient[0].mobileno, "admin");
                console.log(AdminTrimmedMobileno, "////////");
            }
            else {
                AdminTrimmedMobileno = AdminPatientMobileNo;
            }
            const buffered_ip = Buffer.from(hosCredentials[0].ip, 'base64');
            const buffered_db_name = Buffer.from(hosCredentials[0].db_name, 'base64');
            const buffered_db_password = Buffer.from(hosCredentials[0].db_password, 'base64');
            const buffered_db_user = Buffer.from(hosCredentials[0].username, 'base64');
            const decryptedIP = this.decrypt(buffered_ip, this.privateKey);
            const decryptedDB_NAME = this.decrypt(buffered_db_name, this.privateKey);
            const decryptedDB_PASS = this.decrypt(buffered_db_password, this.privateKey);
            const decryptedDB_USER = this.decrypt(buffered_db_user, this.privateKey);
            const dynamicDbConfig = this.dynamicDbService.createDynamicDatabaseConfig(decryptedIP, decryptedDB_NAME, decryptedDB_PASS, decryptedDB_USER);
            const dynamicConnectionOptions = dynamicDbConfig;
            dynamicConnection = await (0, typeorm_2.createConnection)(dynamicConnectionOptions);
            const patientInHos = await dynamicConnection.query(`select patients.id from patients where patients.mobileno = ? or patients.mobileno = ?`, [
                AdminPatientMobileNo, AdminTrimmedMobileno
            ]);
            console.log(patientInHos, "111111");
            let hosPatientId;
            if (patientInHos[0]) {
                console.log(patientInHos, "./././././");
                hosPatientId = patientInHos[0].id;
                console.log(patientInHos, "irukaaan bhaa hospital la");
            }
            else {
                const dateString = AdminPatient[0].dob;
                const dateObject = new Date(dateString);
                const timestamp = dateObject.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
                console.log(timestamp, "********");
                const createPatient = await dynamicConnection.query(`insert into patients (
    patient_name,
    dob,
    image,
    mobileno,
    email,
    gender,
    address,
    ABHA_number
  )
  values
  (?,?,?,?,?,?,?,?)`, [
                    AdminPatient[0].patient_name,
                    timestamp,
                    AdminPatient[0].image,
                    AdminPatient[0].mobileno,
                    AdminPatient[0].email,
                    AdminPatient[0].gender,
                    AdminPatient[0].address,
                    AdminPatient[0].ABHA_number,
                ]);
                console.log(createPatient);
                hosPatientId = createPatient.insertId;
                console.log("illa  bhaa hospital la");
            }
            const [staffEmailAdmin] = await this.connection.query(`select email from staff where id = ?`, [AppointmentEntity.doctor]);
            console.log("staffEmailAdmin", staffEmailAdmin.email);
            const [HosStaff] = await dynamicConnection.query(`select id from staff where email = ?`, [staffEmailAdmin.email]);
            let HOSStaffId = HosStaff.id;
            var HOStransaction_id;
            const HOScaseRef = await dynamicConnection.query('INSERT INTO case_references values(default,default)');
            const HOSopdCreate = await dynamicConnection.query(`
    insert into opd_details (case_reference_id,patient_id) values (?,?)`, [
                HOScaseRef.insertId,
                hosPatientId
            ]);
            const HOScharge = await dynamicConnection.query('select charge_id from shift_details where shift_details.staff_id = ?', [HOSStaffId]);
            console.log(HOScharge, "..............");
            let HOScharge_id = await HOScharge[0].charge_id;
            const HOSamount = await dynamicConnection.query(`
  select charges.standard_charge,tax_category.percentage tax_percentage, round((charges.standard_charge+
    (charges.standard_charge*((tax_category.percentage)/100))),2) amount from 
  charges join tax_category on charges.tax_category_id = tax_category.id
where charges.id = ?`, [HOScharge_id]);
            const Patient_charges_insert = await dynamicConnection.query(`insert into patient_charges(
    date,
    opd_id,
    qty,
    charge_id,
    standard_charge,
    
    tax,
    apply_charge,
    amount
    ) values(?,?,?,?,?,?,?,?)`, [
                AppointmentEntity.date,
                HOSopdCreate.insertId,
                1,
                HOScharge_id,
                HOSamount[0].standard_charge,
                HOSamount[0].tax_percentage,
                HOSamount[0].standard_charge,
                HOSamount[0].amount
            ]);
            if (AppointmentEntity.payment_mode !== 'cash') {
                console.log("entering if ");
                console.log("hosTransactions");
                const HOStransactions = await dynamicConnection.query(`
insert into transactions (
  type,
  section,
  patient_id,
  case_reference_id,
  amount,
  payment_mode,
  payment_date
  ) values
  (?,?,?,?,?,?,?)`, [
                    'payment',
                    'Appointment',
                    hosPatientId,
                    HOScaseRef.insertId,
                    HOSamount[0].amount,
                    AppointmentEntity.payment_mode,
                    AppointmentEntity.payment_date,
                ]);
                HOStransaction_id = HOStransactions.insertId;
                console.log(HOStransaction_id, "idddddddddddddd");
            }
            const HOSvisitInsert = await dynamicConnection.query(`
  insert into visit_details(
    opd_details_id,
    patient_charge_id,
    transaction_id,
    case_type,
    cons_doctor,
    appointment_date,
    live_consult,
    payment_mode
    ) values (?,?,?,?,?,?,?,?)`, [
                HOSopdCreate.insertId,
                Patient_charges_insert.insertId,
                HOStransaction_id,
                "",
                HOSStaffId,
                AppointmentEntity.date + " " + AppointmentEntity.time,
                AppointmentEntity.live_consult,
                AppointmentEntity.payment_mode
            ]);
            const HOSvisit_details_id = HOSvisitInsert.insertId;
            let hos_appointment_id;
            const [HosGlobalShiftId] = await this.connection.query(`select * from global_shift where id = ?`, [
                AppointmentEntity.global_shift_id
            ]);
            console.log(HosGlobalShiftId, "HosGlobalShiftId");
            const [HosShiftId] = await this.connection.query(`select * from doctor_shift where id = ?`, [
                AppointmentEntity.shift_id
            ]);
            console.log(HosShiftId, "HosShiftIdd");
            console.log(hosPatientId, HOScaseRef.insertId, HOSvisitInsert.insertId, AppointmentEntity.date, AppointmentEntity.time, HOSStaffId, 'Online', HosGlobalShiftId.hospital_global_shift_id, HosShiftId.hospital_doctor_shift_id, AppointmentEntity.live_consult, HOSamount[0].amount, "``````````");
            try {
                const HOSbookAppnt = await dynamicConnection.query(`insert into appointment(
      patient_id,
      case_reference_id,
      visit_details_id,
      date,
      time,
      doctor,
      source,
      global_shift_id,
      shift_id,
      live_consult,
      amount
      ) values(?,?,?,?,?,?,?,?,?,?,?)`, [
                    hosPatientId,
                    HOScaseRef.insertId,
                    HOSvisitInsert.insertId,
                    AppointmentEntity.date,
                    AppointmentEntity.time,
                    HOSStaffId,
                    'Online',
                    HosGlobalShiftId.hospital_global_shift_id,
                    HosShiftId.hospital_doctor_shift_id,
                    AppointmentEntity.live_consult,
                    HOSamount[0].amount
                ]);
                hos_appointment_id = HOSbookAppnt.insertId;
                console.log("11122233");
                if (HOStransaction_id) {
                    const HOSupdatetxn = await dynamicConnection.query(`update transactions set transactions.appointment_id = ? where transactions.id = ?`, [
                        HOSbookAppnt.insertId,
                        HOStransaction_id
                    ]);
                }
                let payment_type;
                if (AppointmentEntity.payment_mode = `cash`) {
                    payment_type = `Offline`;
                }
                else {
                    payment_type = `Online`;
                }
                let hosTransId;
                if (HOStransaction_id) {
                    hosTransId = HOStransaction_id;
                }
                const HosApptPayment = await dynamicConnection.query(`insert into
    appointment_payment
    (appointment_id,
      charge_id,
      paid_amount,
      payment_mode,
      payment_type,
      transaction_id,
      date) values (?,?,?,?,?,?,?)`, [
                    hos_appointment_id,
                    HOScharge_id,
                    HOSamount[0].amount,
                    AppointmentEntity.payment_mode,
                    payment_type,
                    hosTransId,
                    AppointmentEntity.date + " " + AppointmentEntity.time
                ]);
            }
            catch (error) {
                return "errhos_appor in Appointment insert :" +
                    console.log(error, "error");
            }
            await dynamicConnection.close();
            var transaction_id;
            const caseRef = await this.connection.query('INSERT INTO case_references values(default,default)');
            const opdCreate = await this.connection.query(`
insert into opd_details (case_reference_id,patient_id,Hospital_id,hos_opd_id) values (?,?,?,?)`, [
                caseRef.insertId,
                AppointmentEntity.patient_id,
                AppointmentEntity.Hospital_id,
                HOSopdCreate.insertId
            ]);
            const getAdminChargeId = await this.connection.query(`select id from charges 
where Hospital_id = ? 
and hospital_charges_id = ?`, [
                AppointmentEntity.Hospital_id,
                HOScharge_id
            ]);
            console.log(getAdminChargeId[0].id, "..........0000..........");
            const patient_charges = await this.connection.query(`insert into patient_charges(
      date,
      opd_id,
      qty,
      charge_id,
      standard_charge,    
      tax,
      apply_charge,
      amount
      ) values(?,?,?,?,?,?,?,?)`, [
                AppointmentEntity.date,
                opdCreate.insertId,
                1,
                getAdminChargeId[0].id,
                HOSamount[0].standard_charge,
                HOSamount[0].tax_percentage,
                HOSamount[0].standard_charge,
                HOSamount[0].amount
            ]);
            console.log("11111111111111111111111111111");
            try {
                if (AppointmentEntity.payment_mode !== 'cash') {
                    console.log("entering if ");
                    const transactions = await this.connection.query(`
  insert into transactions (
  type,
  section,
  patient_id,
  case_reference_id,
  amount,
  payment_mode,
  payment_date,Hospital_id,
  hos_transaction_id
  ) values
  (?,?,?,?,?,?,?,?,?)`, [
                        'payment',
                        'Appointment',
                        AppointmentEntity.patient_id,
                        await caseRef.insertId,
                        await HOSamount[0].amount,
                        AppointmentEntity.payment_mode,
                        AppointmentEntity.payment_date,
                        AppointmentEntity.Hospital_id,
                        await HOStransaction_id
                    ]);
                    transaction_id = await transactions.insertId;
                    console.log(transaction_id, "idddddddddddddd");
                }
            }
            catch (error) {
                return "error in Admin transaction insert";
            }
            console.log("[[]][[]]");
            const visitInsert = await this.connection.query(`
insert into visit_details(
  opd_details_id,
  patient_charge_id,
  transaction_id,
  case_type,
  cons_doctor,
  appointment_date,
  live_consult,
  payment_mode,Hospital_id,
  hos_visit_id
  ) values (?,?,?,?,?,?,?,?,?,?)`, [
                await opdCreate.insertId,
                await patient_charges.insertId,
                transaction_id,
                "",
                AppointmentEntity.doctor,
                AppointmentEntity.date + " " + AppointmentEntity.time,
                AppointmentEntity.live_consult,
                AppointmentEntity.payment_mode,
                AppointmentEntity.Hospital_id,
                await HOSvisitInsert.insertId
            ]);
            const visit_details_id = await visitInsert.insertId;
            const bookAppnt = await this.connection.query(`insert into appointment(
      patient_id,
      case_reference_id,
      visit_details_id,
      date,
      time,
      doctor,
      source,
      global_shift_id,
      shift_id,
      live_consult,
      Hospital_id,hos_appointment_id,amount
      ) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`, [
                AppointmentEntity.patient_id,
                await caseRef.insertId,
                await visitInsert.insertId,
                AppointmentEntity.date,
                AppointmentEntity.time,
                AppointmentEntity.doctor,
                'Online',
                AppointmentEntity.global_shift_id,
                AppointmentEntity.shift_id,
                AppointmentEntity.live_consult,
                AppointmentEntity.Hospital_id,
                hos_appointment_id,
                await HOSamount[0].amount
            ]);
            console.log("*****************************");
            let payment_type;
            if (AppointmentEntity.payment_mode = `cash`) {
                payment_type = `Offline`;
            }
            else {
                payment_type = `Online`;
            }
            if (transaction_id) {
                const updatetxn = await this.connection.query(`update transactions set transactions.appointment_id = ? where transactions.id = ?`, [
                    bookAppnt.insertId,
                    transaction_id
                ]);
            }
            const HosApptPayment = await this.connection.query(`insert into
    appointment_payment
    (appointment_id,
      charge_id,
      paid_amount,
      payment_mode,
      payment_type,
      transaction_id,
      date) values (?,?,?,?,?,?,?)`, [
                bookAppnt.insertId,
                getAdminChargeId[0].id,
                HOSamount[0].amount,
                AppointmentEntity.payment_mode,
                payment_type,
                transaction_id,
                AppointmentEntity.date + " " + AppointmentEntity.time
            ]);
            return [{
                    "status": "success",
                    "messege": "Appointment booked successfully",
                    "inserted_details": await this.connection.query('select * from appointment where id = ?', [bookAppnt.insertId])
                }];
        }
        catch (error) {
            if (dynamicConnection) {
                dynamicConnection.close();
            }
            console.log(error);
            return "error is : " + error;
        }
    }
    async findAllPast(patient_id) {
        const pastAppoint = await this.connection.query(`
    SELECT
    appointment.id appointment_id,
    staff.id AS doctor_id,
    CONCAT(staff.name, ' ', staff.surname) AS doctor_name,
    hospitals.plenome_id AS hospital_id,
    hospitals.hospital_name,
    appointment.date,
    appointment.time,
    appointment.appointment_status,
    patients.id AS patient_id,
    GROUP_CONCAT(specialist.specialist_name) AS specialist_names
FROM
    appointment
LEFT JOIN staff ON staff.id = appointment.doctor
LEFT JOIN hospital_staffs ON hospital_staffs.staff_id = staff.id
LEFT JOIN hospitals ON hospitals.plenome_id = hospital_staffs.hospital_id
LEFT JOIN patients ON patients.id = appointment.patient_id
LEFT JOIN specialist ON 
    IF(
        JSON_VALID(staff.specialist) AND JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON)),
        1,
        0
    )
WHERE
    patients.id = ? and appointment.date < date(now()) and appointment.is_deleted = 0
GROUP BY
    doctor_id, doctor_name, hospital_id, hospital_name, date, time, appointment_status, patient_id,appointment_id;`, [patient_id]);
        return pastAppoint;
    }
    async findAllUpcoming(patient_id) {
        const pastAppoint = await this.connection.query(`
        SELECT
        appointment.id appointment_id,
        staff.id AS doctor_id,
        CONCAT(staff.name, ' ', staff.surname) AS doctor_name,
        hospitals.plenome_id AS hospital_id,
        hospitals.hospital_name,
        appointment.date,
        appointment.time,
        appointment.appointment_status,
        patients.id AS patient_id,
        appointment.live_consult,
        appointment.global_shift_id,
        appointment.shift_id,
        GROUP_CONCAT(specialist.specialist_name) AS specialist_names
    FROM
        appointment
    LEFT JOIN staff ON staff.id = appointment.doctor
    LEFT JOIN hospital_staffs ON hospital_staffs.staff_id = staff.id
    LEFT JOIN hospitals ON hospitals.plenome_id = hospital_staffs.hospital_id
    LEFT JOIN patients ON patients.id = appointment.patient_id
    LEFT JOIN specialist ON 
        IF(
            JSON_VALID(staff.specialist) AND JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON)),
            1,
            0
        )
    WHERE
        patients.id = ? and appointment.date >= date(now()) and appointment.is_deleted = 0
    GROUP BY
        doctor_id, doctor_name, hospital_id, hospital_name, date, time,appointment_id, appointment_status, patient_id
        ORDER BY appointment.id ASC;`, [patient_id]);
        return pastAppoint;
    }
    async findDoctors(speciality, search) {
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
WHERE staff_roles.role_id = 3    AND doctor_shift.day = DAYNAME(now())
GROUP BY doctor_id, doctor_name, plenome_id, hospital_name, doctor_shift.day, doctor_shift.global_shift_id,charge_id   `;
        let values = [];
        if (search) {
            query = `SELECT 
  CONCAT(staff.name, " ", staff.surname," (",staff.employee_id,")") AS doctor_name,
  staff.id AS doctor_id,
  hospitals.plenome_id hospital_id,
  hospitals.hospital_name,
  staff.work_exp AS experience,
  ROUND(((ROUND((SELECT AVG(staff_rating.rating) FROM staff_rating WHERE staff_rating.staff_id = staff.id), 1) / 5) * 100), 0) AS rating,
  GROUP_CONCAT(DISTINCT specialist.specialist_name) AS specialist_names,
  GROUP_CONCAT(DISTINCT CONCAT(start_time, " - ", end_time,"(",doctor_shift.id,")") ORDER BY doctor_shift.id) AS 'timings(shift_id)',
  doctor_shift.day,
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
WHERE staff_roles.role_id = 3    AND doctor_shift.day = DAYNAME(now())  and (staff.name like ? or hospital_name like ?) 
GROUP BY doctor_id, doctor_name, plenome_id, hospital_name, doctor_shift.day, doctor_shift.global_shift_id,charge_id 
`;
            values.push('%' + search + '%');
            values.push('%' + search + '%');
        }
        if (speciality) {
            query += ' HAVING FIND_IN_SET( ?, specialist_names) > 0';
            values.push(speciality);
        }
        console.log(query);
        console.log(values);
        try {
            const oneDoctors = await this.connection.query(query, values);
            return oneDoctors;
        }
        catch (error) {
            return error;
        }
    }
    findOne(id) {
        return `This action returns a #${id} appointment`;
    }
    async update(id, AppointmentEntity) {
        let dynamicConnection;
        try {
            try {
                const privateKey = await this.generatePublicKey();
                console.log(privateKey, "private key");
            }
            catch (error) {
                return "error in generating publicKey";
            }
            const hosCredentials = await this.connection.query(`select ip,db_name,db_password,username
    from hospital_credentials where hospital_id = ?`, [AppointmentEntity.Hospital_id]);
            const buffered_ip = Buffer.from(hosCredentials[0].ip, 'base64');
            const buffered_db_name = Buffer.from(hosCredentials[0].db_name, 'base64');
            const buffered_db_password = Buffer.from(hosCredentials[0].db_password, 'base64');
            const buffered_db_user = Buffer.from(hosCredentials[0].username, 'base64');
            const decryptedIP = this.decrypt(buffered_ip, this.privateKey);
            const decryptedDB_NAME = this.decrypt(buffered_db_name, this.privateKey);
            const decryptedDB_PASS = this.decrypt(buffered_db_password, this.privateKey);
            const decryptedDB_USER = this.decrypt(buffered_db_user, this.privateKey);
            const dynamicDbConfig = this.dynamicDbService.createDynamicDatabaseConfig(decryptedIP, decryptedDB_NAME, decryptedDB_PASS, decryptedDB_USER);
            const dynamicConnectionOptions = dynamicDbConfig;
            dynamicConnection = await (0, typeorm_2.createConnection)(dynamicConnectionOptions);
            const [getAppntDetails] = await this.connection.query(`select hos_appointment_id,visit_details_id from appointment where id = ?`, [id]);
            console.log(getAppntDetails, "=====");
            const hosApptId = getAppntDetails.hos_appointment_id;
            console.log("hosAppt_id", hosApptId);
            const AdminVisitDetailsId = getAppntDetails.visit_details_id;
            const [getVisitDetailsId] = await dynamicConnection.query(`select visit_details_id from appointment where id = ?`, [hosApptId]);
            const hosVisitDetailsId = getVisitDetailsId.visit_details_id;
            console.log("hosVisitDetailsId", hosVisitDetailsId);
            const hosVisitUpdate = await dynamicConnection.query(`update visit_details set 
     appointment_date = ?,
     live_consult = ? 
     where id = ?`, [
                AppointmentEntity.date + " " + AppointmentEntity.time,
                AppointmentEntity.live_consult,
                hosVisitDetailsId
            ]);
            const [HosGlobalShiftId] = await this.connection.query(`select * from global_shift where id = ?`, [
                AppointmentEntity.global_shift_id
            ]);
            console.log(HosGlobalShiftId, "HosGlobalShiftId");
            const [HosShiftId] = await this.connection.query(`select * from doctor_shift where id = ?`, [
                AppointmentEntity.shift_id
            ]);
            console.log(HosShiftId, "HosShiftId");
            const hosApptUpdate = await dynamicConnection.query(`update appointment set 
date = ?,
time = ?,
global_shift_id = ?,
shift_id = ?,
live_consult = ? where id = ?`, [
                AppointmentEntity.date,
                AppointmentEntity.time,
                HosGlobalShiftId.hospital_global_shift_id,
                HosShiftId.hospital_doctor_shift_id,
                AppointmentEntity.live_consult,
                hosApptId
            ]);
            await dynamicConnection.close();
            const adminVisitDetailsUpdate = await this.connection.query(`update visit_details set 
    appointment_date = ?,
    live_consult = ? 
    where id = ?`, [
                AppointmentEntity.date + " " + AppointmentEntity.time,
                AppointmentEntity.live_consult,
                AdminVisitDetailsId
            ]);
            const adminApptUpdate = await this.connection.query(`update appointment set 
  date = ?,
  time = ?,
  global_shift_id = ?,
  shift_id = ?,
  live_consult = ? where id = ?`, [
                AppointmentEntity.date,
                AppointmentEntity.time,
                AppointmentEntity.global_shift_id,
                AppointmentEntity.shift_id,
                AppointmentEntity.live_consult,
                id
            ]);
            return [{
                    "status": "success",
                    "messege": "Appointment updated successfully",
                    "inserted_details": await this.connection.query('select * from appointment where id = ?', [id])
                }];
        }
        catch (error) {
            if (dynamicConnection) {
                await dynamicConnection.close();
            }
            return "error is : " + error;
        }
    }
    async remove(id) {
        let dynamicConnection;
        try {
            try {
                const privateKey = await this.generatePublicKey();
            }
            catch (error) {
                return "error in generating publicKey";
            }
            const [getHosAppt_id] = await this.connection.query(`select Hospital_id,hos_appointment_id,visit_details_id from appointment where id = ?`, [id]);
            console.log(getHosAppt_id, "getHosAppt_id");
            const hosCredentials = await this.connection.query(`select ip,db_name,db_password,username
    from hospital_credentials where hospital_id = ?`, [getHosAppt_id.Hospital_id]);
            const buffered_ip = Buffer.from(hosCredentials[0].ip, 'base64');
            const buffered_db_name = Buffer.from(hosCredentials[0].db_name, 'base64');
            const buffered_db_password = Buffer.from(hosCredentials[0].db_password, 'base64');
            const buffered_db_user = Buffer.from(hosCredentials[0].username, 'base64');
            const decryptedIP = this.decrypt(buffered_ip, this.privateKey);
            const decryptedDB_NAME = this.decrypt(buffered_db_name, this.privateKey);
            const decryptedDB_PASS = this.decrypt(buffered_db_password, this.privateKey);
            const decryptedDB_USER = this.decrypt(buffered_db_user, this.privateKey);
            const dynamicDbConfig = this.dynamicDbService.createDynamicDatabaseConfig(decryptedIP, decryptedDB_NAME, decryptedDB_PASS, decryptedDB_USER);
            const dynamicConnectionOptions = dynamicDbConfig;
            dynamicConnection = await (0, typeorm_2.createConnection)(dynamicConnectionOptions);
            console.log(getHosAppt_id, "getHosAppt_id");
            const [getAppt_details] = await dynamicConnection.query(` select visit_details_id,
            case_reference_id from appointment where id = ? `, [getHosAppt_id.hos_appointment_id]);
            console.log("getAppt_details", getAppt_details);
            if (getAppt_details) {
                const [getOpd_id] = await dynamicConnection.query(`select opd_details_id 
  from visit_details where id = ?`, [getAppt_details.visit_details_id]);
                const deleteHosOPD = await dynamicConnection.query(`delete from 
  opd_details where id = ?`, [getOpd_id.id]);
                console.log("Dynamic connection established successfully:", dynamicConnection);
                const delHosApptResult = await dynamicConnection.query(`delete from appointment where id = ?`, [getHosAppt_id.hos_appointment_id]);
                console.log("Result of delete from appointment:", delHosApptResult);
            }
            const getOPDid = await this.connection.query(`select id from visit_details where id = ?`, [getHosAppt_id.visit_details_id]);
            const delAppt = await this.connection.query('update appointment set is_deleted = 1 WHERE id = ?', [id]);
            if (dynamicConnection) {
                dynamicConnection.close();
            }
            return `appointment of id : ${id}  is deleted. `;
        }
        catch (error) {
            if (dynamicConnection) {
                dynamicConnection.close();
            }
            return error;
            console.log(error);
        }
    }
};
exports.AppointmentService = AppointmentService;
exports.AppointmentService = AppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => dynamic_db_service_1.DynamicDatabaseService))),
    __metadata("design:paramtypes", [typeorm_2.Connection,
        dynamic_db_service_1.DynamicDatabaseService])
], AppointmentService);
//# sourceMappingURL=appointment.service.js.map