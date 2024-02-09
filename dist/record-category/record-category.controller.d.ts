import { RecordCategoryService } from './record-category.service';
export declare class RecordCategoryController {
    private readonly recordCategoryService;
    constructor(recordCategoryService: RecordCategoryService);
    findAll(): Promise<any>;
}
