import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Injectable()
export class RecordCategoryService {
 
  constructor(@InjectConnection() private connection: Connection
  ) {}

async  findAll() {
    const getCategory = await this.connection.query('select id,name from patient_record_type')
    return getCategory;
  }

}
