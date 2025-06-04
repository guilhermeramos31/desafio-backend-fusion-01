import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';

export const ApiDeletePlanet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete planet',
      description: 'Permanently removes a planet from the system',
    }),
    ApiOkResponse({
      description: 'Planet successfully removed',
      example: {
        message: 'Planeta deletado com sucesso',
      },
    }),
    ApiNotFoundResponse({
      description: 'Planet not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Planeta não encontrado',
      }),
    }),
  );
};
