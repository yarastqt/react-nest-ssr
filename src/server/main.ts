import { NestFactory } from '@nestjs/core';

import { ViteService } from '@server/infrastructure/vite';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const viteService = app.get(ViteService);
  const vite = await viteService.createDevServer();

  app.useGlobalFilters(new HttpExceptionFilter());

  // TODO: Apply when not production.
  app.use(vite.middlewares);

  // await app.listen(3000);

  return app;
}
// bootstrap();

export const app = bootstrap();
