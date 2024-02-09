import { Module } from '@nestjs/common';
import { BloodGroupService } from './blood-group.service';
import { BloodGroupController } from './blood-group.controller';

@Module({
  controllers: [BloodGroupController],
  providers: [BloodGroupService],
})
export class BloodGroupModule {}
