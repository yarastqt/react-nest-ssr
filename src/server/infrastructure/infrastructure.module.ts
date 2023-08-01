import { Module } from '@nestjs/common';

import { RendererModule } from './renderer';
import { ViteModule } from './vite';

@Module({
  imports: [ViteModule, RendererModule],
})
export class InfrastructureModule {}
