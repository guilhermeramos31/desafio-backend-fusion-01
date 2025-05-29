import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';

export const ApiDeleteUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete user account',
      description: 'Permanently removes a user account from the system',
    }),
    ApiOkResponse({
      description: 'User account successfully removed',
      example: {
        message: 'Usuário deletado com sucesso',
      },
    }),
    ApiNotFoundResponse({
      description: 'User account not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Usuário não existe',
      }),
    }),
  );
};
