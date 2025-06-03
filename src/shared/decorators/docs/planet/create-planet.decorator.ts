import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreatePlanetInputDto } from '@planet/dto';
import { ErrorExample, PlanetExample } from '@shared/decorators';
import { Climate, Terrain } from '@prisma/client';

export const ApiCreatePlanet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a new planet',
      description: 'Endpoint for create planet',
    }),
    ApiBody({
      type: CreatePlanetInputDto,
      description: 'Create a new planet',
      examples: {
        valid: {
          summary: 'Valid registration example',
          value: {
            name: 'Terra',
            climate: Climate.TEMPERATE,
            terrain: Terrain.GRASSLANDS,
            population: 0,
            starSystemId: 'daoisjheduiqwey1723141sdasd',
          },
        },
        invalid: {
          summary: 'Invalid registration example',
          value: {
            name: 0,
            climate: 'OTHER',
            terrain: 'OTHER',
            population: 'zero',
            starSystemId: 1,
          },
        },
        empty: {
          summary: 'Empty registration example',
          value: {
            name: '',
            climate: '',
            terrain: '',
            population: '',
            starSystemId: '',
          },
        },
      },
    }),
    ApiCreatedResponse({
      description: 'Create a new planet',
      example: PlanetExample('Planeta criado com sucesso'),
    }),
    ApiBadRequestResponse({
      description: 'Invalid request data',
      example: ErrorExample({
        error: 'Bad Request',
        statusCode: 400,
        message: [
          'name should not be empty',
          'climate must be one of the following values: ARID, ALPINE, CONTINENTAL, TROPICAL, TEMPERATE',
          'climate should not be empty',
          'terrain must be one of the following values: DESERT, GRASSLANDS, MOUNTAINS, JUNGLE, URBAN, TUNDRA, OCEAN, BARREN, SWAMP',
          'terrain should not be empty',
          'starSystemId should not be empty',
          'name must be a string',
          'starSystemId must be a string',
        ],
      }),
    }),
    ApiConflictResponse({
      description: 'Planet already exist',
      example: ErrorExample({
        error: 'Conflict',
        message: 'Planeta já existe',
        statusCode: 409,
      }),
    }),
  );
};
