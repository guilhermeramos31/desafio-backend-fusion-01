import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample, UserExample } from '@shared/decorators';

export const ApiUpdateUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update User',
      description: 'Update user with the provided data',
    }),
    ApiBody({
      description: 'Update user with the provided data',
      examples: {
        default: {
          summary: 'Update user with the provided data',
          description: 'Update user with the provided data',
          value: {
            name: 'jhon',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Successfully updated user',
      example: UserExample('Usuário atualizado'),
    }),
    ApiNotFoundResponse({
      description: 'User does not exist',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Usuário não existe',
      }),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name should not be empty',
          'email should not be empty',
          'password should not be empty',
        ],
      }),
    }),
  );
};
