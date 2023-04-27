import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { description, name, version } from 'apps/auth-service/package.json';
import { bold } from 'colorette';
import * as cookieParser from 'cookie-parser';
import { AbstractLoggerService } from 'libs/modules/global/logger/abstract';
import { AbstractSecretsService } from 'libs/modules/global/secrets/abstract';
import { AppExceptionFilter } from 'libs/utils/filters/http-exception.filter';
import { ExceptionInterceptor } from 'libs/utils/interceptors/exception/http-exception.interceptor';

import { MainModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED,
    }),
  );

  const loggerService = app.get(AbstractLoggerService);

  loggerService.setApplication(name);
  app.useGlobalFilters(new AppExceptionFilter(loggerService));

  app.useGlobalInterceptors(new ExceptionInterceptor());

  const {
    AUTH_SERVICE: { PORT, URL },
    ENV,
  } = app.get(AbstractSecretsService);

  app.useLogger(loggerService);

  app.useGlobalPipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.PRECONDITION_FAILED }));

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder().setTitle(name).setDescription(description).setVersion(version).build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  loggerService.info({ message: `🟢 ${name} listening at ${bold(PORT)} on ${bold(ENV?.toUpperCase())} 🟢\n` });

  await app.listen(PORT);

  const openApiURL = `${URL}:${PORT}/docs`;

  loggerService.info({ message: `🔵 swagger listening at ${bold(openApiURL)}` });
}
bootstrap();
