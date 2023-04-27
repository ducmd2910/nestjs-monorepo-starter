import { Module } from '@nestjs/common';
import { LoggerModule } from 'libs/modules/global/logger/module';
import { GlobalModule } from 'libs/modules/global/module';

import { HealthModule } from './health/health.module';

@Module({
  imports: [GlobalModule, LoggerModule, HealthModule],
})
export class MainModule {}
