import { Module } from '@nestjs/common';

import { AbstractHealthService } from './abstracts/health.abstract';
import { HealthController } from './controllers/health.controller';
import { HealthService } from './services/health.service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [
    {
      provide: AbstractHealthService,
      useClass: HealthService,
    },
  ],
  exports: [AbstractHealthService],
})
export class HealthModule {}
