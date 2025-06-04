import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';
import { SpaceshipExample } from '@shared/decorators/docs/examples/spaceship.example';

export const ApiFindSpaceship = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find spaceship',
      description: 'Retrieve spaceship details from the system',
    }),
    ApiOkResponse({
      description: 'Spaceship retrieved successfully',
      example: SpaceshipExample('Nave encontrado'),
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
