import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample, PlanetExample } from '@shared/decorators';

export const ApiFindPlanet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find Planet',
      description: 'Retrieve planet details from the system',
    }),
    ApiOkResponse({
      description: 'Planet retrieved successfully',
      example: PlanetExample('Planeta encontrado'),
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
