import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExamples } from '@user/docs';

export const ApiDeleteUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'User deleted successfully',
      description: 'User deleted successfully',
    }),
    ApiOkResponse({
      description: 'User deleted successfully',
      example: {
        message: 'Usuário deletado com sucesso!',
      },
    }),
    ApiNotFoundResponse({
      description: 'User does not exist!',
      example: ErrorExamples('Not Found', 404, 'Usuário não existe!'),
    }),
  );
};
