import { DoctorProfileService } from './doctor_profile.service';
import { DoctorProfile } from './entities/doctor_profile.entity';
export declare class DoctorProfileController {
    private readonly doctorProfileService;
    constructor(doctorProfileService: DoctorProfileService);
    create(StaffReview: DoctorProfile): Promise<{
        messege: string;
        review_details: any;
    }[]>;
    findOne(id: number): Promise<any>;
    findAbout(id: number): Promise<any>;
    findshift(id: number, date: string): Promise<any>;
    findhos(id: number): Promise<any>;
    findstats(id: number): Promise<any>;
    findreview(id: number): Promise<any>;
}
