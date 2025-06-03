import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdateCharacterDto } from '@character/dto';
import { CharacterExample } from '@shared/decorators/docs/examples/character.example';
import { ErrorExample } from '@shared/decorators';

export const ApiUpdateCharacter = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update character',
      description: 'Update character with the provider data',
    }),
    ApiBody({
      type: UpdateCharacterDto,
      description: 'Update character with the provider data',
      examples: {
        default: {
          summary: 'Update character',
          description: 'Update character',
          value: {
            name: 'John',
          },
        },
        invalid: {
          summary: 'Update character',
          description: 'Update character',
          value: {
            name: 1,
          },
        },
        empty: {
          summary: 'Update character',
          description: 'Update character',
          value: {
            name: '',
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Update character',
      example: CharacterExample('Personagem atualizado com sucesso'),
    }),
    ApiNotFoundResponse({
      description: 'Character does not exist',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Personagem não encontrado',
      }),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: ['name should not be empty', 'name must be a string'],
      }),
    }),
  );
};
