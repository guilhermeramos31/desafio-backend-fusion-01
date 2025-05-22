import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserExamples } from '@user/docs/decorators/examples/user-examples';
import { ErrorExamples } from '@user/docs/decorators/examples/error-exemples';

export const ApiFindUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Search a user',
      description: 'Search user with the provided data',
    }),
    ApiOkResponse({
      description: 'User exist!',
      example: UserExamples('User exist'),
    }),
    ApiNotFoundResponse({
      description: 'User does not exist!',
      example: ErrorExamples('Not Found', 404, 'Usuário não existe!'),
    }),
  );
};
