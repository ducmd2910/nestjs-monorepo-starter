import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { name } from 'apps/notification-service/package.json';
import { bold } from 'colorette';
import { AbstractLoggerService } from 'libs/modules/global/logger/abstract';
import { AbstractSecretsService } from 'libs/modules/global/secrets/abstract';
import { AppExceptionFilter, GlobalRpcExceptionFilter } from 'libs/utils';
import { NOTIFICATION_QUEUE } from 'libs/utils/constants';
import { ExceptionInterceptor } from 'libs/utils/interceptors/exception/http-exception.interceptor';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });

  const {
    NOTIFICATION_SERVICE: { PORT },
    ENV,
    MESSAGE_QUEUE,
  } = app.get(AbstractSecretsService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      ...MESSAGE_QUEUE.RMQ_OPTIONS,
      queue: NOTIFICATION_QUEUE,
    },
  });

  const loggerService = app.get(AbstractLoggerService);

  loggerService.setApplication(name);

  app.useGlobalFilters(new AppExceptionFilter(loggerService));

  app.useGlobalFilters(new GlobalRpcExceptionFilter());

  app.useGlobalInterceptors(new ExceptionInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }),
  );

  app.useLogger(loggerService);

  app.setGlobalPrefix('api');

  await app.listen(PORT).then(() => {
    loggerService.info({ message: `🟢 ${name} listening at ${bold(PORT)} on ${bold(ENV?.toUpperCase())} 🟢\n` });
  });

  await app.startAllMicroservices().then(() => {
    loggerService.info({
      message: `🟢 All microservice has started 🟢\n`,
    });
  });
}

bootstrap();
