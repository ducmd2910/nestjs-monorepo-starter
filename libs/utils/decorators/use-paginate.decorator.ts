import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export function UsePaginate(customDecorators?: ClassDecorator[] | MethodDecorator[] | PropertyDecorator[]) {
  if (!customDecorators) {
    customDecorators = [ApiProperty()];
  }
  return applyDecorators(
    ApiQuery({ name: 'page', required: false, type: Number }),
    ApiQuery({ name: 'limit', required: false, type: Number }),
    ApiQuery({ name: 'search', required: false, type: String }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      type: 'array',
      example: ['createdAt:DESC'],
    }),
    ...customDecorators,
  );
}
