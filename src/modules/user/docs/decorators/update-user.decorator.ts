import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserExamples } from '@user/docs/decorators/examples/user-examples';
import { ErrorExamples } from '@user/docs/decorators/examples/error-exemples';

export const ApiUpdateUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update User',
      description: 'Update User with the provided data',
    }),
    ApiOkResponse({
      description: 'Successfully updated user',
      example: UserExamples('User updated'),
    }),
    ApiNotFoundResponse({
      description: 'User does not exist!',
      example: ErrorExamples('Not Found', 404, 'Usuário não existe!'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExamples('Bad Request', 400, [
        'name should not be empty',
        'email should not be empty',
        'password should not be empty',
      ]),
    }),
  );
};
