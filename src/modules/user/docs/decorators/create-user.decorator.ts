import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateUserInputDto } from '@user/dto';
import { ErrorExamples, UserExamples } from '@user/docs';

export const ApiCreateUser = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new user',
      description: 'Creates a new user with the provided data',
    }),
    ApiBody({
      type: CreateUserInputDto,
      description: 'User registration data',
      examples: {
        default: {
          value: CreateUserInputDto,
        },
      },
    }),
    ApiCreatedResponse({
      description: 'User created successfully',
      example: UserExamples('Usuário criado com sucesso!'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExamples('Bad Request', 400, [
        'name should not be empty',
        'email should not be empty',
        'password should not be empty',
      ]),
    }),
    ApiConflictResponse({
      description: 'User conflict',
      example: ErrorExamples('Conflict', 400, 'Usuário já existe!'),
    }),
  );
};
