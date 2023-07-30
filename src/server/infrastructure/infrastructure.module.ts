import { Module } from '@nestjs/common';

import { RendererModule } from './renderer';

@Module({
  imports: [RendererModule],
})
export class InfrastructureModule {}
