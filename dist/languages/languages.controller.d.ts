import { LanguagesService } from './languages.service';
export declare class LanguagesController {
    private readonly languagesService;
    constructor(languagesService: LanguagesService);
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
}
