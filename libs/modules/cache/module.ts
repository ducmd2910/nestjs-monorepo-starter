import { Module } from '@nestjs/common';

import { AbstractLoggerService } from '../global/logger/abstract';
import { AbstractSecretsService } from '../global/secrets/abstract';
import { AbstractCacheService } from './abstract';
import { RedisService } from './service';

@Module({
  providers: [
    {
      provide: AbstractCacheService,
      useFactory: async ({ REDIS_URL }: AbstractSecretsService, logger: AbstractLoggerService) => {
        const cacheService = new RedisService({ url: REDIS_URL }, logger);
        await cacheService.connect();
        return cacheService;
      },
      inject: [AbstractSecretsService, AbstractLoggerService],
    },
  ],
  exports: [AbstractCacheService],
})
export class RedisModule {}
