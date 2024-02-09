import { Connection } from 'typeorm';
import { Patient } from './entities/profile.entity';
export declare class ProfileService {
    private connection;
    constructor(connection: Connection);
    create(PatientEntity: Patient): Promise<any>;
    findOne(id: number): Promise<{
        data: {
            status: string;
            messege: string;
            profile: {
                id: any;
                patient_name: any;
                dob: any;
                gender: any;
                email: any;
                address: any;
                state_code: any;
                district_code: any;
                ABHA_number: any;
                blood_bank_product_id: any;
                blood_group: any;
                pincode: any;
                emergency_mobile_no: any;
            }[];
        };
    }[]>;
    update(id: number, PatientEntity: Patient): Promise<{
        data: {
            status: string;
            messege: string;
            updated_values: any;
        };
    }[] | {
        status: string;
        messege: string;
        error: any;
    }[]>;
    updateAbhaNumber(id: string, PatientEntity: Patient): Promise<{
        data: {
            status: string;
            messege: string;
            updated_values: any;
        };
    }[] | {
        status: string;
        messege: string;
        error: any;
    }[]>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }[]>;
}
