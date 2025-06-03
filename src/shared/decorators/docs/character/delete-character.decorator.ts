import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ErrorExample } from '@shared/decorators';

export const ApiDeleteCharacter = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete character',
      description: 'Permanently removes a character from the system',
    }),
    ApiOkResponse({
      description: 'Character successfully removed',
      example: {
        message: 'Personagem deletado com sucesso',
      },
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
