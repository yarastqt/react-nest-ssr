import { Module } from '@nestjs/common';
import { InfrastructureModule } from '@server/infrastructure';

@Module({
  imports: [InfrastructureModule],
})
export class AppModule {}
