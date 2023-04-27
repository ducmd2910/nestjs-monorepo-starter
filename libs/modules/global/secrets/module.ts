import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AbstractSecretsService } from './abstract';
import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [
    {
      provide: AbstractSecretsService,
      useClass: SecretsService,
    },
  ],
  exports: [AbstractSecretsService],
})
export class SecretsModule {}
