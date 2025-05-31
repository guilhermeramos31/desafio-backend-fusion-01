import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { StarSystemExample } from '@shared/decorators/docs/examples/star-system.example';
import { CreateStarSystemDto } from '@star-system/dto';
import { ErrorExample } from '@shared/decorators';

export const ApiCreateStarSystem = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new star system',
      description: 'Endpoint for registering a new star system',
    }),
    ApiBody({
      type: CreateStarSystemDto,
      description: 'Create a new star system',
      examples: {
        valid: {
          summary: 'Valid registration example',
          description: 'Sample payload with all required fields',
          value: CreateStarSystemDto,
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
    ApiCreatedResponse({
      description: 'Create a new star system',
      example: StarSystemExample('Sistema criado com sucesso'),
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
      description: 'Star System already exist',
      example: ErrorExample({
        error: 'Conflict',
        message: 'Esse sistema já existe',
        statusCode: 409,
      }),
    }),
  );
};
