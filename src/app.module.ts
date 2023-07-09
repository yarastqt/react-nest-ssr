import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RenderService } from './render.service';

@Module({
  controllers: [AppController],
  providers: [RenderService],
})
export class AppModule {}
