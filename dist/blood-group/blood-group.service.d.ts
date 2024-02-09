import { Connection } from 'typeorm';
export declare class BloodGroupService {
    private connection;
    constructor(connection: Connection);
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
}
