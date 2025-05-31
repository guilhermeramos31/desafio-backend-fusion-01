import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample, UserExample } from '@shared/decorators';

export const ApiFindUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find user account',
      description: 'Retrieve user details from the system',
    }),
    ApiOkResponse({
      description: 'User found successfully',
      example: UserExample('Usuário encontrado com sucesso'),
    }),
    ApiNotFoundResponse({
      description: 'User not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Usuário não encontrado',
      }),
    }),
  );
};
