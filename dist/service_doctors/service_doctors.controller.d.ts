import { ServiceDoctorsService } from './service_doctors.service';
export declare class ServiceDoctorsController {
    private readonly serviceDoctorsService;
    constructor(serviceDoctorsService: ServiceDoctorsService);
    findAll(date: string, gender: string, speciality: string, language: string): Promise<any>;
    findOne(id: string): string;
}
