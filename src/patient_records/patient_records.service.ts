import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { PatientRecord } from './entities/patient_record.entity';

@Injectable()
export class PatientRecordsService {

  constructor(@InjectConnection() private connection: Connection
  ) {}
  
async  create(recordEntity: PatientRecord) {
    const recordEnter = await this.connection.query(`insert into patient_records (patient_id,record_name,
      record_type_id,files,tags)
     values(?,?,?,?,?)`,[recordEntity.patient_id,
    recordEntity.record_name,
  recordEntity.record_type_id,
recordEntity.files,
JSON.stringify(recordEntity.tags)
])
console.log(recordEnter,"recordEnter");

return [{
  "status":"success",
  "messege":"Patient record uploaded successfully"}];
  }

 

async  findOne(id: number) {
  console.log("aabbcc");
  
    const getAllRecords = await this.connection.query(`select * from patient_records where patient_id = ?`,[id])
    return getAllRecords;
  }

  async  findByType(id: number,type_id:number) {
    console.log("aabbccdd");

    const getAllRecords = await this.connection.query(`select * from patient_records where patient_id = ?
     and record_type_id = ?`,[id,type_id])
    return getAllRecords;
  }

async  remove(id: number) {
    const delRecords = await this.connection.query(`delete from patient_records where id = ?`,[id])
    return `This action removes a #${id} patientRecord`;
  }
}
