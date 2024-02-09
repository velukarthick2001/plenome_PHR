import { Module } from '@nestjs/common';
import { SignUpService } from './sign_up.service';
import { SignUpController } from './sign_up.controller';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
})
export class SignUpModule {}
