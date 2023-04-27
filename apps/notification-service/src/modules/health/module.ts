import { Module } from '@nestjs/common';

import { AbstractHealthService } from './abstract';
import { HealthController } from './controller';
import { HealthService } from './service';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [
    {
      provide: AbstractHealthService,
      useClass: HealthService,
    },
  ],
})
export class HealthModule {}
