import { NestFactory } from '@nestjs/core';

import { createViteServer } from '@server/infrastructure/vite';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './app.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const viteServer = await createViteServer();

  app.useGlobalFilters(new HttpExceptionFilter());

  // TODO: Apply when not production.
  app.use(viteServer.middlewares);

  // await app.listen(3000);

  return app;
}
// bootstrap();

export const app = bootstrap();
