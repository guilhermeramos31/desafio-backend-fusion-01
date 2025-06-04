import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCharacterDto } from '@character/dto';
import { SpaceshipExample } from '@shared/decorators/docs/examples/spaceship.example';
import { ErrorExample } from '@shared/decorators';

export const ApiCreateSpaceship = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new character',
      description: 'Endpoint for create character',
    }),
    ApiBody({
      type: CreateCharacterDto,
      description: 'Create a new spaceship',
      examples: {
        valid: {
          summary: 'Valid registration example',
          value: {
            name: 'ASdaw',
            model: 'N33-as',
            manufacturer: 'ship',
            passengerCapacity: 100,
          },
        },
        invalid: {
          summary: 'Invalid registration example',
          value: {
            name: 1,
            model: 1,
            manufacturer: 1,
            passengerCapacity: '',
          },
        },
        empty: {
          value: {
            name: '',
            model: '',
            manufacturer: '',
            passengerCapacity: 100,
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Create a new spaceship',
      example: SpaceshipExample('Nave espacial criada com sucesso'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name must be a string',
          'name should not be empty',
          'model must be a string',
          'model should not be empty',
          'manufacturer must be a string',
          'manufacturer should not be empty',
        ],
      }),
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
