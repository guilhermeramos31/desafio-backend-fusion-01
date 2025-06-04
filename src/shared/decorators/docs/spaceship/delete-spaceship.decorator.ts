import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';

export const ApiDeleteSpaceship = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete character',
      description: 'Permanently removes a spaceship from the system',
    }),
    ApiOkResponse({
      description: 'Spaceship successfully removed',
      example: {
        message: 'Nave deletada com sucesso',
      },
    }),
    ApiNotFoundResponse({
      description: 'Spaceship not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Nave não encontrado',
      }),
    }),
  );
};
