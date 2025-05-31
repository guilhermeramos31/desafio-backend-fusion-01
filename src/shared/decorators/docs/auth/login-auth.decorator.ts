import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginAuthDTO } from '@auth/dto';
import { AuthExample, ErrorExample } from '@shared/decorators';

export const ApiLoginAuth = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'User authentication',
      description:
        'Authenticates user credentials and returns an access token upon successful validation',
    }),
    ApiBody({
      type: LoginAuthDTO,
      description: 'User credentials for authentication',
      examples: {
        valid: {
          summary: 'Valid login example',
          description: 'Sample payload with correct credential format',
          value: LoginAuthDTO,
        },
        invalid: {
          summary: 'Invalid login example',
          description: 'Sample payload showing incorrect format',
          value: {
            email: 'not-an-email',
            password: '123',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Login auth successfully',
      example: AuthExample('Logado com sucesso'),
    }),
    ApiUnauthorizedResponse({
      description: 'Login auth unsuccessfully',
      example: ErrorExample({
        error: 'Unauthorized',
        statusCode: 401,
        message: 'Credenciais inválidas',
      }),
    }),
  );
};
