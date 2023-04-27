import { Injectable } from '@nestjs/common';

import { AbstractHealthService } from './abstract';

@Injectable()
export class HealthService implements AbstractHealthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ping(message: string): void {
    // eslint-disable-next-line no-console
    console.log('pong:' + message);
  }

  eventTest(message: string): void {
    // eslint-disable-next-line no-console
    console.log(`message '${message}' handle success`);
  }
}
