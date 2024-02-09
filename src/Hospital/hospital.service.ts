
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { HospitalEntity } from './entities/hospital.entity';

@Injectable()
export class HospitalService {
  createQueryBuilder: any;
  constructor(
    @InjectRepository(HospitalEntity)
    private readonly hospitalRepository: Repository<HospitalEntity>,
  ) {}


  async getHospitalDetails(): Promise<any[]> {
    const query = `
    select distinct
    hospitals.plenome_id hospital_id,
    hospitals.logo,
    hospitals.hospital_name,
    concat(hospitals.address," ",hospitals.state," ",hospitals.district," - ",hospitals.pincode) address,
    (select count(*) from hospital_rating where hospital_rating.hospital_id = hospitals.plenome_id ) ratingcount,
    ROUND(((ROUND((SELECT AVG(hospital_rating.rating) FROM hospital_rating WHERE hospital_rating.hospital_id = hospitals.plenome_id), 1))), 1) AS rating
    from hospitals 
    left join hospital_staffs on hospital_staffs.hospital_id = hospitals.plenome_id
    `;

    return this.hospitalRepository.query(query);
  }

  async searchHospitalsByName(name: string): Promise<any[]> {
    const searchQuery = `
    select distinct
    hospitals.plenome_id hospital_id,
    hospitals.logo,
    hospitals.hospital_name,
    concat(hospitals.address," ",hospitals.state," ",hospitals.district," - ",hospitals.pincode) address,
    (select count(*) from hospital_rating where hospital_rating.hospital_id = hospitals.plenome_id ) ratingcount,
    ROUND(((ROUND((SELECT AVG(hospital_rating.rating) FROM hospital_rating WHERE hospital_rating.hospital_id = hospitals.plenome_id), 1))), 1) AS rating
    from hospitals 
    left join hospital_staffs on hospital_staffs.hospital_id = hospitals.plenome_id
      WHERE hospitals.hospital_name LIKE ?
    `;
  
    return this.hospitalRepository.query(searchQuery, [`%${name}%`]);
  }
  

  async getHospitalDetailsById(id: number): Promise<any> {
    const query = `
      SELECT
        h.plenome_id AS hospital_id,
        h.hospital_name,
        h.address,
        h.image,
        h.logo,
        h.contact_no AS phone_number,
        h.overview,
        GROUP_CONCAT(hs.services) AS services
      FROM
        hospitals h
      LEFT JOIN hospital_service hs ON hs.hospital_id = h.plenome_id
      WHERE
        h.plenome_id = ?
      GROUP BY h.plenome_id, h.hospital_name, h.address, h.image, h.logo, h.contact_no, h.overview;
    `;
  
    return this.hospitalRepository.query(query, [id]);
  }

  async getHospitalAppointmentHistoryById(patient_id: number,hospital_id: number): Promise<any[]> {
    console.log("11",[patient_id,hospital_id]);
    
    const query = `
    select 
    CONCAT(staff.name, " ", staff.surname," (",staff.employee_id,")") AS doctor_name,
    staff.id AS doctor_name,
    GROUP_CONCAT(DISTINCT specialist.specialist_name) AS specialist_names,
  appointment.date , appointment.time
  from appointment 
  left join staff on staff.id = appointment.doctor
  LEFT JOIN specialist ON JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON), '$') = 1
  where appointment.patient_id = ? and appointment.Hospital_id = ?
  group by staff.id,appointment.id `;

    return this.hospitalRepository.query(query, [patient_id,hospital_id]);
}


  async getHospitalDoctorsById(id: number): Promise<any[]> {
    const query = `
    select 
    CONCAT(staff.name, " ", staff.surname," (",staff.employee_id,")") AS doctor_name,
    staff.id AS doctor_id,
hospitals.plenome_id hospital_id,
    hospitals.hospital_name,
    staff.work_exp AS experience,
    GROUP_CONCAT(DISTINCT specialist.specialist_name) AS specialist_names
    ,
     GROUP_CONCAT(DISTINCT CONCAT(start_time, " - ", end_time,"(",doctor_shift.id,")") ORDER BY doctor_shift.id) AS 'timings(shift_id)',
         GROUP_CONCAT( distinct doctor_shift.id) AS shift_id,
     doctor_shift.global_shift_id
FROM staff 
  LEFT JOIN hospital_staffs ON hospital_staffs.staff_id = staff.id
  LEFT JOIN hospitals ON hospitals.plenome_id = hospital_staffs.hospital_id
  LEFT JOIN staff_roles ON staff.id = staff_roles.staff_id
   LEFT JOIN doctor_shift ON doctor_shift.staff_id = staff.id
  LEFT JOIN shift_details on shift_details.staff_id = staff.id
LEFT JOIN specialist ON JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON), '$') = 1
where hospitals.plenome_id = ?
--  and doctor_shift.day = dayname(now())
 and staff_roles.role_id = 3 
  GROUP BY doctor_id, doctor_name, plenome_id, hospital_name,doctor_shift.global_shift_id `;

    return this.hospitalRepository.query(query, [id]);
  }
  

}
