import { Injectable } from '@nestjs/common';

import { AbstractHealthService } from '../abstracts/health.abstract';

@Injectable()
export class HealthService implements AbstractHealthService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  async ping(): Promise<string> {
    return 'pong';
  }
}
