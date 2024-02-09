import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class DynamicDatabaseService {
    createDynamicDatabaseConfig(ip: string, databaseName: string, password: string, username: string): TypeOrmModuleOptions;
}
