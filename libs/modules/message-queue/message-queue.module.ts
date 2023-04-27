import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';

import { AbstractLoggerService } from '../global/logger/abstract';
import { LoggerModule } from '../global/logger/module';
import { GlobalModule } from '../global/module';
import { AbstractSecretsService } from '../global/secrets/abstract';
import { AbstractMessageQueue } from './message-queue.abstract';
import { MessageQueueService } from './message-queue.service';
@Module({
  imports: [
    GlobalModule,
    LoggerModule,
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: async ({ MESSAGE_QUEUE }: AbstractSecretsService, logger: AbstractLoggerService) => {
        return {
          uri: MESSAGE_QUEUE.RMQ_URL,
          connectionInitOptions: { wait: false },
          logger: logger,
        };
      },
      inject: [AbstractSecretsService, AbstractLoggerService],
    }),
  ],
  providers: [
    {
      provide: AbstractMessageQueue,
      useClass: MessageQueueService,
    },
  ],
  exports: [AbstractMessageQueue],
})
export class MessageQueueModule {}

// export library
export { ackErrorHandler, RabbitRPC, RabbitSubscribe, requeueErrorHandler } from '@golevelup/nestjs-rabbitmq';
