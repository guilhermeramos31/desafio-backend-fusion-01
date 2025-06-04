import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserInputDto } from '@user/dto';
import { ErrorExample, UserExample } from '@shared/decorators';

export const ApiRegisterAuth = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Register new user',
      description: 'Endpoint for creating a new user account in the system',
    }),
    ApiBody({
      type: CreateUserInputDto,
      description: 'Required data for user registration',
      examples: {
        valid: {
          summary: 'Correct registrations model',
          description:
            'Example of payload with all required fields properly filled',
          value: CreateUserInputDto,
        },
        invalid: {
          summary: 'Invalid registration model',
          description: 'Sample payload showing incorrect format',
          value: {
            name: 1,
            email: 'not-an-email',
            password: '123',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Registration data validation successfully',
      example: UserExample('Usuário registrado com sucesso'),
    }),
    ApiBadRequestResponse({
      description: 'Request data validation failed',
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
    ApiConflictResponse({
      description: 'Data conflict',
      example: ErrorExample({
        error: 'Conflict',
        message: 'Já existe um usuário com este e-mail cadastrado',
        statusCode: 409,
      }),
    }),
  );
};
