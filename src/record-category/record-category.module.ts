import { Module } from '@nestjs/common';
import { RecordCategoryService } from './record-category.service';
import { RecordCategoryController } from './record-category.controller';

@Module({
  controllers: [RecordCategoryController],
  providers: [RecordCategoryService],
})
export class RecordCategoryModule {}
