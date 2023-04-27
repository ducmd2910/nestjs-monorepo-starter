import { applyDecorators, SetMetadata } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const AUTH_KEY = 'auth';
export const Auth = () => {
  return applyDecorators(
    SetMetadata(AUTH_KEY, true),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
};
