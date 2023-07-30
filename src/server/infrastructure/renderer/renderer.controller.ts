import {
  Controller,
  Get,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';

import { $$router } from '@client/shared/routing';

import { RendererService } from './renderer.service';
import { RendererGuard } from './renderer.guard';

@Controller()
@UseGuards(RendererGuard)
export class RendererController {
  constructor(private renderer: RendererService) {}

  @Get('*')
  // TODO: метадату можно не сетить, можно просто передать в констрруктор гарда.
  @SetMetadata('routes', new Set($$router.routes.map((route) => route.path)))
  getHome(@Req() request: Request, @Res() response: Response) {
    return this.renderer.render({ request, response });
  }
}
