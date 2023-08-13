import { NestFactory } from '@nestjs/core';

import { ViteService } from '@server/infrastructure/vite';
import { isProduction } from '@shared/lib/environment';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());

  if (isProduction) {
    app.listen(3000);
  } else {
    const viteService = app.get(ViteService);
    const vite = await viteService.createDevServer();

    app.use(vite.middlewares);
  }

  return app;
}

export const app = bootstrap();
