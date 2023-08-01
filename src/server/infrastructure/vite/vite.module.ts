import { Global, Module } from '@nestjs/common';

import { ViteService } from './vite.service';

@Global()
@Module({
  providers: [ViteService],
  exports: [ViteService],
})
export class ViteModule {}
