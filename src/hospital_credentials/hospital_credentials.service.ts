import { Injectable } from '@nestjs/common';
import { HospitalCredential } from './entities/hospital_credential.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as crypto from 'crypto';
import * as fs from 'fs';

@Injectable()
export class HospitalCredentialsService {
  constructor(@InjectConnection() private connection: Connection) {}
  
  private publicKey: string;
  private privateKey: string;

  async generatePublicKey() {
    try {
      this.publicKey = fs.readFileSync('./src/public_key.pem', 'utf8');
      this.privateKey = fs.readFileSync('./src/private_key.pem', 'utf8');
    } catch (error) {
      console.error('Error reading keys:', error);
      // Handle the error as needed
    }
  }

async  create(credentialEntity: HospitalCredential) {
  const publicKey = await this.generatePublicKey();
  const buffer_ip = Buffer.from(credentialEntity.ip, 'utf8');
  const buffer_db_name = Buffer.from(credentialEntity.db_name, 'utf8');
  const buffer_db_password = Buffer.from(credentialEntity.db_password, 'utf8');
  const buffer_db_username = Buffer.from(credentialEntity.username, 'utf8');

  const crypted_ip = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer_ip
  )
  const crypted_db_name = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer_db_name
  )
  const crypted_db_password = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer_db_password
  )
  const crypted_db_username = crypto.publicEncrypt(
    { key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING },
    buffer_db_username
  )

  const cryptedIP = crypted_ip.toString('base64');
  const cryptedDBNAME = crypted_db_name.toString('base64');
  const cryptedDBPASS = crypted_db_password.toString('base64');
  const cryptedDBUSER = crypted_db_username.toString('base64');


    const cedentialCreate = await this.connection.query(
      `INSERT INTO hospital_credentials (hospital_id, ip, db_name, db_password, username) VALUES (?, ?, ?, ?, ?)`,
      [
        credentialEntity.hospital_id,
        cryptedIP,
        cryptedDBNAME,
        cryptedDBPASS,
        cryptedDBUSER
      ]
    )






  










    // console.log(cryptedIP,"cryptedIP");
    // console.log(cryptedDBNAME,"cryptedDBNAME");
    // console.log(cryptedDBPASS,"cryptedDBPASS");
    // console.log(cryptedDBUSER,"cryptedDBUSER");

    const decryptedIP = this.decrypt(crypted_ip, this.privateKey);
  console.log('Decrypted IP:', decryptedIP);


    
    return "inserted id : "+cedentialCreate.insertId
  }


  private decrypt(encryptedData: Buffer, privateKey: string): string {
    const decryptedBuffer = crypto.privateDecrypt(
      { key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING },
      encryptedData
    );
    return decryptedBuffer.toString('utf-8');
  }

  findAll() {
    return `This action returns all hospitalCredentials`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hospitalCredential`;
  }

  update(id: number, credentialEntity: HospitalCredential) {
    return `This action updates a #${id} hospitalCredential`;
  }

  remove(id: number) {
    return `This action removes a #${id} hospitalCredential`;
  }
}
