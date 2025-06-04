import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';

export const ApiDeleteStarSystem = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete star system',
      description: 'Permanently removes a star system from the system',
    }),
    ApiOkResponse({
      description: 'Star system successfully removed',
      example: {
        message: 'Sistema deletado com sucesso',
      },
    }),
    ApiNotFoundResponse({
      description: 'Star system not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Sistema solar não encontrado',
      }),
    }),
  );
};
