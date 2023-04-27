import { AUTH_SERVICE_ENVIRONMENT, NOTIFICATION_SERVICE_ENVIRONMENT } from './enum';

export abstract class AbstractSecretsService {
  ENV: string;
  LOG_LEVEL: string;
  REDIS_URL: string;

  DATABASE: {
    DEFAULT_DB: {
      HOST: string;
      PORT: number;
      USER_NAME: string;
      PASSWORD: string;
      DATABASE: string;
    };

    DEFAULT_DB_SLAVES?: {
      HOST: string;
      PORT: number;
      USER_NAME: string;
      PASSWORD: string;
      DATABASE: string;
    }[];
  };

  NOTIFICATION_SERVICE: {
    PORT: NOTIFICATION_SERVICE_ENVIRONMENT.PORT | number;
  };

  AUTH_SERVICE: {
    PORT: AUTH_SERVICE_ENVIRONMENT.PORT | number;
    URL: AUTH_SERVICE_ENVIRONMENT.URL | string;
  };

  MESSAGE_QUEUE: {
    RMQ_URL: string;
    RMQ_OPTIONS: object;
  };
}
