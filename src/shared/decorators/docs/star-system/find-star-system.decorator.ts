import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';
import { StarSystemExample } from '@shared/decorators/docs/examples/star-system.example';

export const ApiFindStarSystem = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find star system',
      description: 'Retrieve star system details from the system',
    }),
    ApiOkResponse({
      description: 'Star system retrieved successfully',
      example: StarSystemExample('Sistema solar encontrado com sucesso'),
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
