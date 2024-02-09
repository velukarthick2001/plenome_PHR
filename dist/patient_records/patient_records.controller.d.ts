import { PatientRecordsService } from './patient_records.service';
import { PatientRecord } from './entities/patient_record.entity';
export declare class PatientRecordsController {
    private readonly patientRecordsService;
    constructor(patientRecordsService: PatientRecordsService);
    create(recordEntity: PatientRecord): Promise<{
        status: string;
        messege: string;
    }[]>;
    findOne(id: string): Promise<any>;
    findByType(id: number, type_id: number): Promise<any>;
    remove(id: string): Promise<string>;
}
