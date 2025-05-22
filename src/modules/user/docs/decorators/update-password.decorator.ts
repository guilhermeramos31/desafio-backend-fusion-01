import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserExamples } from '@user/docs/decorators/examples/user-examples';
import { ErrorExamples } from '@user/docs';

export const ApiUpdatePassword = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update password',
      description: 'Update password successfully.',
    }),
    ApiOkResponse({
      description: 'Successfully updated password',
      example: UserExamples('Senha atualizada com sucesso!'),
    }),
    ApiNotFoundResponse({
      description: 'User does not exist!',
      example: ErrorExamples('Not Found', 404, 'Usuário não existe!'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExamples('Bad Request', 400, [
        'password should not be empty',
      ]),
    }),
  );
};
