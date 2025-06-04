import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CharacterExample } from '@shared/decorators/docs/examples/character.example';
import { ErrorExample } from '@shared/decorators';

export const ApiFindCharacter = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Find character',
      description: 'Retrieve character details from the system',
    }),
    ApiOkResponse({
      description: 'Character retrieved successfully',
      example: CharacterExample('Personagem encontrado'),
    }),
    ApiNotFoundResponse({
      description: 'Character not found',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Personagem não encontrado',
      }),
    }),
  );
};
