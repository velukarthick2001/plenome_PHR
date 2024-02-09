import { Connection } from 'typeorm';
export declare class ServiceDoctorsService {
    private connection;
    constructor(connection: Connection);
    findAll(date: string, gender: string, speciality: string, language: string): Promise<any>;
    findOne(id: number): string;
}
