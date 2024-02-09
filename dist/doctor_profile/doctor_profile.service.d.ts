import { Connection } from 'typeorm';
import { DoctorProfile } from './entities/doctor_profile.entity';
export declare class DoctorProfileService {
    private connection;
    constructor(connection: Connection);
    create(StaffReview: DoctorProfile): Promise<{
        messege: string;
        review_details: any;
    }[]>;
    findOne(id: number): Promise<any>;
    findAbout(id: number): Promise<any>;
    findCalender(id: number, date: string): Promise<any>;
    finddocHos(id: any): Promise<any>;
    findDocRating(id: any): Promise<any>;
    findDocReview(id: any): Promise<any>;
}
