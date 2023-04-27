import { IPublish } from './message-queue.interface';

export abstract class AbstractMessageQueue {
  abstract sendMessage(queue: string, message: unknown): Promise<void>;
  abstract sendMessageExchange(queue: string, exchange: string, routingKey: string, message: unknown): Promise<void>;
  abstract publish(exchange: string, routingKey: string, message: unknown, option?: IPublish): Promise<void>;
}
