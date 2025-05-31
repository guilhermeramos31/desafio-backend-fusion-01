import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';
import { StarSystemExample } from '@shared/decorators/docs/examples/star-system.example';

export const ApiUpdateStarSystem = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update star system',
      description: 'Update star system with the provided data',
    }),
    ApiBody({
      description: 'Update star system with the provided data',
      examples: {
        default: {
          summary: 'Update star system with the provided data',
          description: 'Update star system with the provided data',
          value: {
            name: 'Sistema Solar',
            description: 'Update star system with the provided data',
          },
        },
        invalid: {
          summary: 'Invalid registration example',
          value: {
            name: 1,
            description: 2,
          },
        },
        empty: {
          summary: 'Empty registration example',
          value: {
            name: '',
            description: '',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Successfully updated star system',
      example: StarSystemExample('Sistema solar atualizado com sucesso'),
    }),
    ApiNotFoundResponse({
      description: 'Star system does not exist',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Sistema solar não encontrado',
      }),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name should not be empty',
          'description should not be empty',
          'name must be a string',
          'description must be a string',
        ],
      }),
    }),
    ApiConflictResponse({
      description: 'This star system already exists',
      example: ErrorExample({
        error: 'Conflict',
        statusCode: 409,
        message: 'Sistema solar já existe',
      }),
    }),
  );
};
