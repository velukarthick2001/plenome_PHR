import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordCategoryService } from './record-category.service';

@Controller('record_category')
export class RecordCategoryController {
  constructor(private readonly recordCategoryService: RecordCategoryService) {}


  @Get()
  findAll() {
    return this.recordCategoryService.findAll();
  }

}
