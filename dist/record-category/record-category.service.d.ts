import { Connection } from 'typeorm';
export declare class RecordCategoryService {
    private connection;
    constructor(connection: Connection);
    findAll(): Promise<any>;
}
