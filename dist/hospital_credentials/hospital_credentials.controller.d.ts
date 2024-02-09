import { HospitalCredentialsService } from './hospital_credentials.service';
import { HospitalCredential } from './entities/hospital_credential.entity';
export declare class HospitalCredentialsController {
    private readonly hospitalCredentialsService;
    constructor(hospitalCredentialsService: HospitalCredentialsService);
    create(credentialEntity: HospitalCredential): Promise<string>;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, credentialEntity: HospitalCredential): string;
    remove(id: string): string;
}
