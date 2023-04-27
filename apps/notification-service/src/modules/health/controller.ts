import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

import { AbstractHealthService } from './abstract';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: AbstractHealthService) {}

  @MessagePattern({ cmd: 'ping' })
  ping(@Payload() message: string): void {
    return this.healthService.ping(message);
  }

  @EventPattern('event-test')
  eventTest(@Payload() message: string): void {
    this.healthService.eventTest(message);
  }
}
