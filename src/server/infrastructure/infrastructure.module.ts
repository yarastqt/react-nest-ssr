import { resolve } from 'node:path';

import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { RendererModule } from './renderer';
import { ViteModule } from './vite';

@Module({
  imports: [
    ViteModule,
    RendererModule,
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'build/client'),
    }),
  ],
})
export class InfrastructureModule {}
