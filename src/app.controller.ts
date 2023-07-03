import { Controller, Get, Req } from '@nestjs/common';

import { RenderService } from './render.service';

@Controller()
export class AppController {
  constructor(private readonly render: RenderService) {}

  @Get('/')
  getHome(@Req() request: Request) {
    return this.render.appRender(request);
  }

  @Get('/personal')
  getPersonal(@Req() request: Request) {
    return this.render.appRender(request);
  }
}
