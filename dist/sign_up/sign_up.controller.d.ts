import { SignUpService } from './sign_up.service';
import { User } from './entities/sign_up.entity';
export declare class SignUpController {
    private readonly signUpService;
    constructor(signUpService: SignUpService);
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
    findsettings(id: string): Promise<any>;
    updatePassword(id: string, userEntity: User): Promise<{
        status: string;
        message: string;
    }[]>;
    updateStettings(id: string, userEntity: User): Promise<{
        status: string;
        message: string;
    }[]>;
    remove(id: string): Promise<{
        status: string;
        message: string;
    }[]>;
}
