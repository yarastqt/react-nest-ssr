import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@server/infrastructure';
import { ApiModule } from '@server/api';

@Module({
  imports: [InfrastructureModule, ApiModule],
})
export class AppModule {}
