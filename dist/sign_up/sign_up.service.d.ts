import { Connection } from 'typeorm';
import { User } from './entities/sign_up.entity';
export declare class SignUpService {
    private connection;
    constructor(connection: Connection);
    check_old_or_new(userEntity: User): Promise<{
        userType: string;
        user_id: any;
    }[] | {
        userType: string;
    }[]>;
    verifyOld(userEntity: User): Promise<{
        messege: string;
        patient_id: any;
        user_details: any;
    }[] | {
        messege: string;
    }[]>;
    createnew(userEntity: User): Promise<any>;
    findsettings(id: number): Promise<any>;
    updatePassword(id: number, userEntity: User): Promise<{
        status: string;
        message: string;
    }[]>;
    updateStettings(id: number, userEntity: User): Promise<{
        status: string;
        message: string;
    }[]>;
    remove(id: number): Promise<{
        status: string;
        message: string;
    }[]>;
}
