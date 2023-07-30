import { Controller, Get } from '@nestjs/common';

@Controller()
export class UserController {
  @Get('/personal/user')
  getUser() {
    return { login: 'yarastqt' };
  }
}
