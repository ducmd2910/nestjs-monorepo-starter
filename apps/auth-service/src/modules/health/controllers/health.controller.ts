import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AbstractHealthService } from '../abstracts/health.abstract';

@Controller('health')
@ApiTags('health')
export class HealthController {
  constructor(private readonly healthService: AbstractHealthService) {}

  @Get('/ping')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'ping' })
  async ping() {
    return this.healthService.ping();
  }
}
