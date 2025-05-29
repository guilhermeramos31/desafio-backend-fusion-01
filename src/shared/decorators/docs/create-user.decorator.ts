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

export const ApiCreateUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user account',
      description: 'Endpoint for registering user new users in the system',
    }),
    ApiBody({
      type: CreateUserInputDto,
      description: 'Payload required for user registration',
      examples: {
        default: {
          summary: 'Valid registration example',
          description: 'Sample payload with all required fields',
          value: CreateUserInputDto,
        },
      },
    }),
    ApiCreatedResponse({
      description: 'User created successfully',
      example: UserExample('Usuário criado com sucesso'),
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
    ApiConflictResponse({
      description: 'User already exist',
      example: ErrorExample({
        error: 'Conflict',
        message: 'Já existe um usuário com este e-mail cadastrado',
        statusCode: 409,
      }),
    }),
  );
};
