import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { LoggerModule } from '../global/logger/module';
import { SecretsModule } from '../global/secrets/module';
import { AbstractOlmoIdClient } from './abstracts/olmo-id-client.abstract';
import { OlmoIdClient } from './services/olmo-id-client.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    LoggerModule,
    SecretsModule,
  ],
  providers: [
    {
      provide: AbstractOlmoIdClient,
      useClass: OlmoIdClient,
    },
  ],
  exports: [AbstractOlmoIdClient],
})
export class HttpClientModule {}
