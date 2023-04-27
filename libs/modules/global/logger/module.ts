import { Module } from '@nestjs/common';

import { AbstractSecretsService } from '../secrets/abstract';
import { AbstractLoggerService } from './abstract';
import { LoggerService } from './service';

@Module({
  providers: [
    {
      provide: AbstractLoggerService,
      useFactory: ({ LOG_LEVEL }: AbstractSecretsService) => {
        const logger = new LoggerService();
        logger.connect(LOG_LEVEL);
        return logger;
      },
      inject: [AbstractSecretsService],
    },
  ],
  exports: [AbstractLoggerService],
})
export class LoggerModule {}
