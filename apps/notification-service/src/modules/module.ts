import { Module } from '@nestjs/common';
import { DefaultDatabaseModule } from 'libs/modules';
import { GlobalModule } from 'libs/modules/global/module';

import { HealthModule } from './health/module';

const ApiModules = [HealthModule];
@Module({
  imports: [GlobalModule, DefaultDatabaseModule, ...ApiModules],
  providers: [],
})
export class MainModule { }
