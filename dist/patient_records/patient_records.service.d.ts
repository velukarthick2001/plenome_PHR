import { Connection } from 'typeorm';
import { PatientRecord } from './entities/patient_record.entity';
export declare class PatientRecordsService {
    private connection;
    constructor(connection: Connection);
    create(recordEntity: PatientRecord): Promise<{
        status: string;
        messege: string;
    }[]>;
    findOne(id: number): Promise<any>;
    findByType(id: number, type_id: number): Promise<any>;
    remove(id: number): Promise<string>;
}
