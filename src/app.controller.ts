import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { RenderService } from './render.service';
import { AppGuard } from './app.guard';

@Controller()
export class AppController {
  constructor(private readonly render: RenderService) {}

  @Get('*')
  getHome(@Req() request: Request): string {
    return this.render.appRender(request);
  }

  // @Get('/personal')
  // // @UseGuards(AppGuard)
  // getPersonal(@Req() request: Request): string {
  //   return this.render.appRender(request);
  // }
}
