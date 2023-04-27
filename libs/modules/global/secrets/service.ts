import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LevelWithSilent } from 'pino';

import { AbstractSecretsService } from './abstract';
import {
  AUTH_SERVICE_ENVIRONMENT,
  DEFAULT_DB_ENVIRONMENT,
  NOTIFICATION_SERVICE_ENVIRONMENT
} from './enum';

@Injectable()
export class SecretsService extends ConfigService implements AbstractSecretsService {
  constructor() {
    super();
  }

  ENV = this.get('ENV');

  LOG_LEVEL = this.get<LevelWithSilent>('LOG_LEVEL');

  REDIS_URL = this.get('REDIS_URL');

  DATABASE = {
    DEFAULT_DB: {
      HOST: this.get<string>(DEFAULT_DB_ENVIRONMENT.HOST),
      PORT: this.get<number>(DEFAULT_DB_ENVIRONMENT.PORT),
      USER_NAME: this.get<string>(DEFAULT_DB_ENVIRONMENT.USERNAME),
      PASSWORD: this.get<string>(DEFAULT_DB_ENVIRONMENT.PASSWORD),
      DATABASE: this.get<string>(DEFAULT_DB_ENVIRONMENT.DATABASE),
    },

    DEFAULT_DB_SLAVES: this.get<string>(DEFAULT_DB_ENVIRONMENT.SLAVES) ? JSON.parse(this.get<string>(DEFAULT_DB_ENVIRONMENT.SLAVES)) : []
  }

  NOTIFICATION_SERVICE = {
    PORT: this.get<number>(NOTIFICATION_SERVICE_ENVIRONMENT.PORT),
  };

  AUTH_SERVICE = {
    PORT: this.get<number>(AUTH_SERVICE_ENVIRONMENT.PORT),
    URL: this.get<string>(AUTH_SERVICE_ENVIRONMENT.URL),
  };


  MESSAGE_QUEUE = {
    RMQ_URL: this.get('RABBIT_MQ_URL'),
    RMQ_OPTIONS: {
      urls: this.get('RABBIT_MQ_URL'),
      queueOptions: {
        durable: false,
      },
      bufferLogs: true,
    }
  };
}
