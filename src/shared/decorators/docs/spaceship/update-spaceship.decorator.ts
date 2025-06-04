import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateSpaceshipDto } from '@spaceship/dto';
import { SpaceshipExample } from '@shared/decorators/docs/examples/spaceship.example';
import { ErrorExample } from '@shared/decorators';

export const ApiUpdateSpaceship = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update spaceship details',
      description:
        'Updates the specified spaceship with the provided data. Partial updates are supported.',
    }),
    ApiBody({
      type: UpdateSpaceshipDto,
      description: 'Spaceship data to update',
      examples: {
        valid_update: {
          summary: 'Valid spaceship update',
          description: 'Example updating spaceship name and passenger capacity',
          value: {
            name: 'Millennium Falcon',
            model: 'YT-1300',
          },
        },
        minimal_update: {
          summary: 'Minimal update',
          description: 'Example updating just the spaceship name',
          value: {
            name: 'Updated Ship Name',
          },
        },
        invalid_data: {
          summary: 'Invalid data types',
          description:
            'Example showing invalid data types that will be rejected',
          value: {
            name: 123,
            passengerCapacity: 'one hundred',
          },
        },
        empty_fields: {
          summary: 'Empty values',
          description:
            'Example showing empty values that will trigger validation errors',
          value: {
            name: '',
            model: '',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Spaceship successfully updated',
      example: SpaceshipExample('Nave atualizada com sucesso'),
    }),
    ApiNotFoundResponse({
      description: 'Spaceship not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message:
          'Spaceship with ID 5870a510-6d3d-4e4c-8fdf-dc730ca6434d not found',
      }),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name should not be empty',
          'name must be a string',
          'passengerCapacity must be a number',
          'model must be a string',
        ],
      }),
    }),
  );
};
