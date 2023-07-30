import {
  Controller,
  Get,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { $$router } from '@client/shared/routing';

import { RenderService } from './render.service';
import { RenderGuard } from './render.guard';

@Controller()
@UseGuards(RenderGuard)
export class AppController {
  constructor(private render: RenderService) {}

  // TODO: Делаем ЧЕРНЫЙлист не-рендер урлов а все остальное рендерим.
  // TODO: Рассмотреть вариант мидлвары вместо контроллера
  // TODO: прокидывание nonce
  // TODO: продовая сборка
  // TODO: код-сплитинг (страниц)

  @Get('*')
  // TODO: метадату можно не сетить, можно просто передать в констрруктор гарда.
  @SetMetadata('routes', new Set($$router.routes.map((route) => route.path)))
  getHome(@Req() request: Request, @Res() response: Response) {
    // @ts-expect-error (a)
    return this.render.appRender({ request, response });
  }
}
