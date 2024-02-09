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
exports.HospitalCredentialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const crypto = require("crypto");
const fs = require("fs");
let HospitalCredentialsService = class HospitalCredentialsService {
    constructor(connection) {
        this.connection = connection;
    }
    async generatePublicKey() {
        try {
            this.publicKey = fs.readFileSync('./src/public_key.pem', 'utf8');
            this.privateKey = fs.readFileSync('./src/private_key.pem', 'utf8');
        }
        catch (error) {
            console.error('Error reading keys:', error);
        }
    }
    async create(credentialEntity) {
        const publicKey = await this.generatePublicKey();
        const buffer_ip = Buffer.from(credentialEntity.ip, 'utf8');
        const buffer_db_name = Buffer.from(credentialEntity.db_name, 'utf8');
        const buffer_db_password = Buffer.from(credentialEntity.db_password, 'utf8');
        const buffer_db_username = Buffer.from(credentialEntity.username, 'utf8');
        const crypted_ip = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer_ip);
        const crypted_db_name = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer_db_name);
        const crypted_db_password = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer_db_password);
        const crypted_db_username = crypto.publicEncrypt({ key: this.publicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer_db_username);
        const cryptedIP = crypted_ip.toString('base64');
        const cryptedDBNAME = crypted_db_name.toString('base64');
        const cryptedDBPASS = crypted_db_password.toString('base64');
        const cryptedDBUSER = crypted_db_username.toString('base64');
        const cedentialCreate = await this.connection.query(`INSERT INTO hospital_credentials (hospital_id, ip, db_name, db_password, username) VALUES (?, ?, ?, ?, ?)`, [
            credentialEntity.hospital_id,
            cryptedIP,
            cryptedDBNAME,
            cryptedDBPASS,
            cryptedDBUSER
        ]);
        const decryptedIP = this.decrypt(crypted_ip, this.privateKey);
        console.log('Decrypted IP:', decryptedIP);
        return "inserted id : " + cedentialCreate.insertId;
    }
    decrypt(encryptedData, privateKey) {
        const decryptedBuffer = crypto.privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, encryptedData);
        return decryptedBuffer.toString('utf-8');
    }
    findAll() {
        return `This action returns all hospitalCredentials`;
    }
    findOne(id) {
        return `This action returns a #${id} hospitalCredential`;
    }
    update(id, credentialEntity) {
        return `This action updates a #${id} hospitalCredential`;
    }
    remove(id) {
        return `This action removes a #${id} hospitalCredential`;
    }
};
exports.HospitalCredentialsService = HospitalCredentialsService;
exports.HospitalCredentialsService = HospitalCredentialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Connection])
], HospitalCredentialsService);
//# sourceMappingURL=hospital_credentials.service.js.map