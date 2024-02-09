import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SignUpService } from './sign_up.service';
import { User } from './entities/sign_up.entity';

@Controller('sign_up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post('/check')
  check_old_or_new(@Body() userEntity: User) {
    return this.signUpService.check_old_or_new(userEntity)
  }

  @Post('/old')
  verifyOld(@Body() userEntity: User) {
    return this.signUpService.verifyOld(userEntity)
  }

  @Post('/new')
  createnew(@Body() userEntity: User) {
    return this.signUpService.createnew(userEntity)
  }

  @Get('/settings/:id')
  findsettings(@Param('id') id: string) {
    return this.signUpService.findsettings(+id);
  }

  @Patch('/updatePassword/:id')
  updatePassword(@Param('id') id: string, @Body() userEntity: User) {
    return this.signUpService.updatePassword(+id, userEntity);
  }

  @Patch('/updateSettings/:id')
  updateStettings(@Param('id') id: string, @Body() userEntity: User) {
    return this.signUpService.updateStettings(+id, userEntity);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signUpService.remove(+id);
  }
}
