import { Connection } from 'typeorm';
export declare class LanguagesService {
    private connection;
    constructor(connection: Connection);
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
}
