import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

import { AbstractLoggerService } from '../global/logger/abstract';
import { AbstractMessageQueue } from './message-queue.abstract';
import { IPublish } from './message-queue.interface';

@Injectable()
export class MessageQueueService implements AbstractMessageQueue {
  constructor(private readonly amqpConnection: AmqpConnection, private logger: AbstractLoggerService) {}

  async sendMessage(queue: string, message: unknown): Promise<void> {
    try {
      await this.amqpConnection.channel.assertQueue(queue, { durable: true });
      this.amqpConnection.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    } catch (error) {
      this.logger.error(error, `send message failed: (queue: ${queue} | message: ${JSON.stringify(message)})`);
    }
  }

  async sendMessageExchange(queue: string, exchange: string, routingKey: string, message: unknown, option?: IPublish) {
    try {
      await this.amqpConnection.channel.assertExchange(exchange, 'direct', { durable: true });
      await this.amqpConnection.channel.assertQueue(queue, { durable: true });
      await this.amqpConnection.channel.bindQueue(queue, exchange, routingKey);

      // Send the message to the queue
      this.amqpConnection.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), option);
    } catch (error) {
      this.logger.error(
        error,
        `send message exchange failed: (queue: ${queue} | exchange: ${exchange} | routingKey: ${routingKey} | message: ${JSON.stringify(
          message,
        )})`,
      );
    }
  }

  async publish(exchange: string, routingKey: string, message: unknown, option?: IPublish) {
    try {
      await this.amqpConnection.channel.assertExchange(exchange, 'direct', { durable: true });
      this.amqpConnection.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), option);
    } catch (error) {
      this.logger.error(
        error,
        `publish message failed: (exchange: ${exchange} | routingKey: ${routingKey} | message: ${JSON.stringify(
          message,
        )})`,
      );
    }
  }
}
