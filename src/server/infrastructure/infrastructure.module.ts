import { resolve } from 'node:path';

import { Module, ModuleMetadata } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import { RendererModule } from './renderer';
import { ViteModule } from './vite';
import { isProduction } from '@shared/lib/environment';

const imports: ModuleMetadata['imports'] = [ViteModule, RendererModule];

if (isProduction) {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: resolve(process.cwd(), 'build/client'),
    }),
  );
}

@Module({
  imports,
})
export class InfrastructureModule {}
