import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class LanguagesService {
  constructor(@InjectConnection() private connection: Connection) {}

async  findAll() {
    const getLanguages = await this.connection.query(`select * from languages`)
    return getLanguages;
  }

async  findOne(id: number) {
    const getLanguages = await this.connection.query(`select * from languages where id = ?`,[id])

    return getLanguages;
  }
}
