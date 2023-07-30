import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RendererService } from './renderer.service';

@Module({
  controllers: [AppController],
  providers: [RendererService],
})
export class AppModule {}
