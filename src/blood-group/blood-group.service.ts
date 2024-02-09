import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class BloodGroupService {
  constructor(@InjectConnection() private connection: Connection) {}


async  findAll() {
    const bloodGroup = await this.connection.query('select id,name from blood_bank_products where is_blood_group = 1')
    return bloodGroup;
  }

async  findOne(id: number) {
    const bloodGroup = await this.connection.query('select id,name from blood_bank_products where is_blood_group = 1 and id = ?',[id])

    return bloodGroup;
  }

}
