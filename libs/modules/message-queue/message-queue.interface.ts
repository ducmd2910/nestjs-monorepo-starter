export interface IAssertQueue {
  exclusive?: boolean | undefined;
  durable?: boolean | undefined;
  autoDelete?: boolean | undefined;
  arguments?: unknown;
  messageTtl?: number | undefined;
  expires?: number | undefined;
  deadLetterExchange?: string | undefined;
  deadLetterRoutingKey?: string | undefined;
  maxLength?: number | undefined;
  maxPriority?: number | undefined;
}
export interface IDeleteQueue {
  ifUnused?: boolean | undefined;
  ifEmpty?: boolean | undefined;
}
export interface IAssertExchange {
  durable?: boolean | undefined;
  internal?: boolean | undefined;
  autoDelete?: boolean | undefined;
  alternateExchange?: string | undefined;
  arguments?: unknown;
}
export interface IDeleteExchange {
  ifUnused?: boolean | undefined;
}
export interface IPublish {
  expiration?: string | number | undefined;
  userId?: string | undefined;
  CC?: string | string[] | undefined;

  mandatory?: boolean | undefined;
  persistent?: boolean | undefined;
  deliveryMode?: boolean | number | undefined;
  BCC?: string | string[] | undefined;

  contentType?: string | undefined;
  contentEncoding?: string | undefined;
  headers?: unknown;
  priority?: number | undefined;
  correlationId?: string | undefined;
  replyTo?: string | undefined;
  messageId?: string | undefined;
  timestamp?: number | undefined;
  type?: string | undefined;
  appId?: string | undefined;
}
export interface IConsume {
  consumerTag?: string | undefined;
  noLocal?: boolean | undefined;
  noAck?: boolean | undefined;
  exclusive?: boolean | undefined;
  priority?: number | undefined;
  arguments?: unknown;
}
export interface IGet {
  noAck?: boolean | undefined;
}

export interface IMessage {
  content: Buffer;
  fields: IMessageFields;
  properties: IMessageProperties;
}

export interface IGetMessage extends IMessage {
  fields: IGetMessageFields;
}

export interface IConsumeMessage extends IMessage {
  fields: IConsumeMessageFields;
}

export interface ICommonMessageFields {
  deliveryTag: number;
  redelivered: boolean;
  exchange: string;
  routingKey: string;
}

export interface IMessageFields extends ICommonMessageFields {
  messageCount?: number | undefined;
  consumerTag?: string | undefined;
}

export interface IGetMessageFields extends ICommonMessageFields {
  messageCount: number;
}

export interface IConsumeMessageFields extends ICommonMessageFields {
  consumerTag: string;
}

export interface IMessageProperties {
  contentType: unknown | undefined;
  contentEncoding: unknown | undefined;
  headers: IMessagePropertyHeaders;
  deliveryMode: unknown | undefined;
  priority: unknown | undefined;
  correlationId: unknown | undefined;
  replyTo: unknown | undefined;
  expiration: unknown | undefined;
  messageId: unknown | undefined;
  timestamp: unknown | undefined;
  type: unknown | undefined;
  userId: unknown | undefined;
  appId: unknown | undefined;
  clusterId: unknown | undefined;
}

export interface IMessagePropertyHeaders {
  'x-first-death-exchange'?: string | undefined;
  'x-first-death-queue'?: string | undefined;
  'x-first-death-reason'?: string | undefined;
  'x-death'?: IXDeath[] | undefined;
  [key: string]: unknown;
}

export interface IXDeath {
  count: number;
  reason: 'rejected' | 'expired' | 'maxlen';
  queue: string;
  time: {
    '!': 'timestamp';
    value: number;
  };
  exchange: string;
  'original-expiration'?: unknown;
  'routing-keys': string[];
}

export interface IServerProperties {
  host: string;
  product: string;
  version: string;
  platform: string;
  copyright?: string | undefined;
  information: string;
  [key: string]: string | undefined;
}
