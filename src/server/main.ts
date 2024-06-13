import { NestFactory } from '@nestjs/core';

import { ViteService } from '@server/infrastructure/vite';
import { isProduction } from '@shared/lib/environment';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './app.filter';
import { RendererService } from '@server/infrastructure/renderer/renderer.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const service = app.get<RendererService>(RendererService);

  app.useGlobalFilters(new GlobalExceptionFilter(service));

  if (isProduction) {
    await app.listen(3000);
  } else {
    const viteService = app.get(ViteService);
    const vite = await viteService.createDevServer();

    app.use(vite.middlewares);
  }

  return app;
}

export const app = bootstrap();
