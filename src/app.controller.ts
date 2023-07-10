import { Controller, Get, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { $$router } from '@client/shared/routing';

import { RenderService } from './render.service';
import { RenderGuard } from './render.guard';

@Controller()
@UseGuards(RenderGuard)
export class AppController {
  constructor(private render: RenderService) {}

  @Get('*')
  @SetMetadata('routes', new Set($$router.routes.map((route) => route.path)))
  getHome(@Req() request: Request) {
    return this.render.appRender(request);
  }
}
