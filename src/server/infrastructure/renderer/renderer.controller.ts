import { Controller, Get, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';

import { routerPaths } from '@client/shared/routing';

import { RendererService } from './renderer.service';

@Controller(routerPaths)
export class RendererController {
  constructor(private renderer: RendererService) {}

  @Get()
  getApplication(@Req() request: Request, @Res() response: Response) {
    return this.renderer.render({ request, response });
  }
}
