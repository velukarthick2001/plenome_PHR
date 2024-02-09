import { Connection } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { DynamicDatabaseService } from 'src/dynamic_db.service';
export declare class AppointmentService {
    private connection;
    private dynamicDbService;
    constructor(connection: Connection, dynamicDbService: DynamicDatabaseService);
    private privateKey;
    private decrypt;
    generatePublicKey(): Promise<void>;
    create(AppointmentEntity: Appointment): Promise<string | {
        status: string;
        messege: string;
        inserted_details: any;
    }[]>;
    findAllPast(patient_id: number): Promise<any>;
    findAllUpcoming(patient_id: number): Promise<any>;
    findDoctors(speciality: string, search: string): Promise<any>;
    findOne(id: number): string;
    update(id: number, AppointmentEntity: Appointment): Promise<string | {
        status: string;
        messege: string;
        inserted_details: any;
    }[]>;
    remove(id: number): Promise<any>;
}
