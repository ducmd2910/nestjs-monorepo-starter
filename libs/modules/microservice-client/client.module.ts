import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_QUEUE, NOTIFICATION_SERVICE } from 'libs/utils/constants';

import { GlobalModule } from '../global/module';
import { AbstractSecretsService } from '../global/secrets/abstract';
@Module({
  imports: [
    GlobalModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: NOTIFICATION_SERVICE,
        useFactory: (config: AbstractSecretsService) => ({
          transport: Transport.RMQ,
          options: {
            ...config.MESSAGE_QUEUE.RMQ_OPTIONS,
            queue: NOTIFICATION_QUEUE,
          },
        }),
        inject: [AbstractSecretsService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroserviceClientModule { }
