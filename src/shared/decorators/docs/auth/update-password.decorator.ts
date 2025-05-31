import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample, UserExample } from '@shared/decorators';
import { UpdatePasswordInputDto } from '@user/dto';

export const ApiUpdatePassword = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update password',
      description: 'Update password successfully',
    }),
    ApiBody({
      type: UpdatePasswordInputDto,
      description: 'Update password successfully',
      examples: {
        valid: {
          summary: 'User password successfully updated',
          description: 'Update password successfully',
          value: {
            password: 'SecurePass123!',
          },
        },
        invalid: {
          summary: 'User password unsuccessfully updated',
          description: 'Update password successfully',
          value: {
            password: '123',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Successfully updated password',
      example: UserExample('Senha atualizada com sucesso'),
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
        message: ['password should not be empty'],
      }),
    }),
  );
};
