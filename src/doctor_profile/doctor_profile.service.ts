import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { DoctorProfile } from './entities/doctor_profile.entity';

@Injectable()
export class DoctorProfileService {
  constructor(@InjectConnection() private connection: Connection) {}

  async create(StaffReview: DoctorProfile) {
    const [check] = await this.connection.query(`select id from staff_rating where patient_id = ? and staff_id = ?`,[
      StaffReview.patient_id,
      StaffReview.staff_id
    ])

    if(check){
      const update = await this.connection.query(`update staff_rating set review = ?,
      rating = ?,
      is_recommended = ?,
      start_on_time = ? where id = ?
      `,[
        StaffReview.review,
      StaffReview.rating,
      StaffReview.is_recommended,
    StaffReview.start_on_time,
    check.id
      ])
      return   [{"messege":"rating updated successfully ",
  "review_details": await this.connection.query('select * from staff_rating where staff_rating.id = ?',[check.id])

}];
    }
else{
  const addReview = await this.connection.query(
    'insert into staff_rating(patient_id,staff_id,review,rating,is_recommended,start_on_time) values (?,?,?,?,?,?)',
    [StaffReview.patient_id,
      StaffReview.staff_id,
      StaffReview.review,
      StaffReview.rating,
      StaffReview.is_recommended,
    StaffReview.start_on_time
  ]
    )
  return   [{"messege":"rating posted successfully ",
  "review_details": await this.connection.query('select * from staff_rating where staff_rating.id = ?',[addReview.insertId])

}];
}
 
  }


async  findOne(id: number) {
    let query = `SELECT distinct
    CONCAT(staff.name, " ", staff.surname," (",staff.employee_id,")") AS doctor_name,
    staff.id AS doctor_id,
    hospitals.plenome_id hospital_id,
    hospitals.hospital_name,
    staff.work_exp AS experience,
    ROUND(((ROUND((SELECT AVG(staff_rating.rating) FROM staff_rating WHERE staff_rating.staff_id = staff.id), 1))), 1) AS rating,
    (select count(*) from staff_rating where staff_rating.staff_id = staff.id ) ratingcount,
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
  where staff.id = ? and doctor_shift.day = dayname(now())
  GROUP BY doctor_id, doctor_name, plenome_id, hospital_name, doctor_shift.day, doctor_shift.global_shift_id,charge_id `
  let values = [id]
  const getDetails = await this.connection.query(query,values)
    return getDetails;
  }

  async  findAbout(id: number) {
    let query = `select 
    staff.id staff_id,
    staff.note about,
    GROUP_CONCAT(DISTINCT specialist.specialist_name) AS speciality_names,
    staff.specialization,
    department.department_name,staff_designation.designation,
    staff.qualification,
    staff.Health_Professional_Registry,
      GROUP_CONCAT(DISTINCT staff_certifications.certificate_name," (",staff_certifications.issued_year,")") AS certifications,
    staff.instagram,
    staff.facebook,
    staff.linkedin,staff.twitter
    from staff 
    LEFT JOIN specialist ON JSON_CONTAINS(staff.specialist, CAST(specialist.id AS JSON), '$') = 1
     LEFT JOIN staff_certifications ON staff_certifications.staff_id = staff.id
    left join department on department.id = staff.department_id
    left join staff_designation on staff_designation.id = staff.staff_designation_id
    where staff.id = ?
    GROUP BY specialization, staff.id, staff.note  `
  let values = [id]
  const getDetails = await this.connection.query(query,values)
    return getDetails;
  }


  async  findCalender(id: number,date:string) {
    let query = `select staff.id,
    GROUP_CONCAT(DISTINCT CONCAT(start_time, " - ", end_time,"(",doctor_shift.id,")") ORDER BY doctor_shift.id) AS 'timings(shift_id)',
    doctor_shift.day,
    GROUP_CONCAT( distinct doctor_shift.id) AS shift_id
    from staff
      LEFT JOIN doctor_shift ON doctor_shift.staff_id = staff.id
      where staff.id = ? and doctor_shift.day = dayname(now())
    group by staff.id,doctor_shift.day `
  let values = []
  values.push(id)
  if(date){
     query = `select staff.id,
    GROUP_CONCAT(DISTINCT CONCAT(start_time, " - ", end_time,"(",doctor_shift.id,")") ORDER BY doctor_shift.id) AS 'timings(shift_id)',
    doctor_shift.day,
    GROUP_CONCAT( distinct doctor_shift.id) AS shift_id
    from staff
      LEFT JOIN doctor_shift ON doctor_shift.staff_id = staff.id
      where staff.id = ? and doctor_shift.day = dayname(?)
    group by staff.id,doctor_shift.day `
     values.push(date)
  }
  const getcalander = await this.connection.query(query,values)
    return getcalander;
  }
async finddocHos(id){
let query = `select distinct
hospitals.plenome_id hospital_id,
hospitals.logo,
hospitals.hospital_name,
concat(hospitals.address," ",hospitals.state," ",hospitals.district," - ",hospitals.pincode) address,
(select count(*) from hospital_rating where hospital_rating.hospital_id = hospitals.plenome_id ) ratingcount,
ROUND(((ROUND((SELECT AVG(hospital_rating.rating) FROM hospital_rating WHERE hospital_rating.hospital_id = hospitals.plenome_id), 1))), 1) AS rating
from hospitals 
left join hospital_staffs on hospital_staffs.hospital_id = hospitals.plenome_id
left join staff on staff.id = hospital_staffs.staff_id
where hospital_staffs.staff_id = ?`
let values = [id]
const getStaffHos = await this.connection.query(query,values)
return getStaffHos
}

async findDocRating(id){
  let query = `select round((((select count(*) from staff_rating where staff_rating.is_recommended = 1 and staff_rating.staff_id = staff.id )/(select count(*) from staff_rating where staff_rating.staff_id = staff.id))*100),0) recommended,
  round((((select count(*) from staff_rating where staff_rating.start_on_time = 1 and staff_rating.staff_id = staff.id)/(select count(*) from staff_rating where staff_rating.staff_id = staff.id ))*100),0) on_time,
  round((select avg(staff_rating.rating)from staff_rating where staff_rating.staff_id = staff.id),1) rating 
  from staff where staff.id = ?`
  let values = [id]
  const getStaffHos = await this.connection.query(query,values)
  return getStaffHos
  }

  async findDocReview(id){
    let query = `select staff_rating.review,patients.patient_name,staff_rating.rating,staff_rating.created_at from 
    staff_rating left join patients on patients.id = staff_rating.patient_id where staff_rating.staff_id = ?`
    let values = [id]
    const getStaffHos = await this.connection.query(query,values)
    return getStaffHos
    }

}
