import { Injectable } from '@nestjs/common';

import { AbstractHealthService } from '../abstracts/health.abstract';


@Injectable()
export class HealthService implements AbstractHealthService {
  constructor(
  ) { }

  async ping(): Promise<string> {
    return 'pong';
  }
}
