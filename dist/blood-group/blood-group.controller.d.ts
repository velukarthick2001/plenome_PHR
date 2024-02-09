import { BloodGroupService } from './blood-group.service';
export declare class BloodGroupController {
    private readonly bloodGroupService;
    constructor(bloodGroupService: BloodGroupService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
