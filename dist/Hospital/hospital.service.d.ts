import { Repository } from 'typeorm';
import { HospitalEntity } from './entities/hospital.entity';
export declare class HospitalService {
    private readonly hospitalRepository;
    createQueryBuilder: any;
    constructor(hospitalRepository: Repository<HospitalEntity>);
    getHospitalDetails(): Promise<any[]>;
    searchHospitalsByName(name: string): Promise<any[]>;
    getHospitalDetailsById(id: number): Promise<any>;
    getHospitalAppointmentHistoryById(patient_id: number, hospital_id: number): Promise<any[]>;
    getHospitalDoctorsById(id: number): Promise<any[]>;
}
