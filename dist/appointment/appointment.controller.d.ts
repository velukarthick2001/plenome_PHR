import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.entity';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    create(AppointmentEntity: Appointment): Promise<string | {
        status: string;
        messege: string;
        inserted_details: any;
    }[]>;
    findDoctors(speciality: string, search: string): Promise<any>;
    findAllPast(id: string): Promise<any>;
    findAllUpcoming(id: string): Promise<any>;
    update(id: string, AppointmentEntity: Appointment): Promise<string | {
        status: string;
        messege: string;
        inserted_details: any;
    }[]>;
    remove(id: string): Promise<any>;
}
