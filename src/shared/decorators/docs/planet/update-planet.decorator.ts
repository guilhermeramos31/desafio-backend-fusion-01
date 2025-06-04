import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UpdatePlanetInputDto } from '@planet/dto';
import { Climate, Terrain } from '@prisma/client';
import { ErrorExample, PlanetExample } from '@shared/decorators';

export const ApiUpdatePlanet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Update planet',
      description: 'Update planet with the provider data',
    }),
    ApiBody({
      type: UpdatePlanetInputDto,
      description: 'Update planet with the provider data',
      examples: {
        default: {
          summary: 'Update planet',
          description: 'Update planet',
          value: {
            climate: Climate.TEMPERATE,
            terrain: Terrain.URBAN,
          },
        },
        climate: {
          summary: 'Update climate',
          description: 'Update climate in planet',
          value: {
            climate: Climate.ARID,
          },
        },
        terrain: {
          summary: 'Update terrain',
          description: 'Update terrain in planet',
          value: {
            terrain: Terrain.GRASSLANDS,
          },
        },
      },
    }),
    ApiOkResponse({
      description: 'Successfully update planet',
      example: PlanetExample('Planeta atualizado com sucesso'),
    }),
    ApiNotFoundResponse({
      description: 'Planet does not exist',
      example: ErrorExample({
        error: 'Not Found',
        statusCode: 404,
        message: 'Planeta não encontrado',
      }),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'climate should not be empty',
          'climate should not be empty',
          'terrain must be a string',
          'terrain must be a string',
        ],
      }),
    }),
  );
};
