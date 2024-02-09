import { HospitalCredential } from './entities/hospital_credential.entity';
import { Connection } from 'typeorm';
export declare class HospitalCredentialsService {
    private connection;
    constructor(connection: Connection);
    private publicKey;
    private privateKey;
    generatePublicKey(): Promise<void>;
    create(credentialEntity: HospitalCredential): Promise<string>;
    private decrypt;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, credentialEntity: HospitalCredential): string;
    remove(id: number): string;
}
