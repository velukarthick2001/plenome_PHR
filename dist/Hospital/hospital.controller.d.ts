import { HospitalService } from './hospital.service';
export declare class HospitalController {
    private readonly hospitalService;
    constructor(hospitalService: HospitalService);
    getHospitalDetails(name?: string): Promise<any[]>;
    getHospitalDetailsById(id: number): Promise<any>;
    getHospitalAppointmentHistoryById(patient_id: number, hospitalId: number): Promise<any[]>;
    getHospitalDoctorsById(hospitalId: number): Promise<any[]>;
}
