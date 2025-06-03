import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiFindAllCharacters = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all characters with pagination',
      description:
        'Returns a paginated list of characters. Allows you to control the page, quantity per page and ordering.',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (default: 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page (default: 10)',
      example: 10,
    }),
    ApiQuery({
      name: 'orderBy',
      required: false,
      default: 'asc',
      enum: ['asc', 'desc'],
      description: 'Listing order (ascending or descending)',
      example: 'asc',
    }),
    ApiOkResponse({
      description: 'Returns paginated list of planet.',
      headers: {
        'X-Total-Items': {
          description: 'Total number of items',
          schema: { type: 'string' },
          example: 2,
        },
        'X-Current-Page': {
          description: 'Current page number',
          schema: { type: 'string' },
          example: 1,
        },
        'X-Items-Per-Page': {
          description: 'Number of items per page',
          schema: { type: 'string' },
          example: 10,
        },
        'X-Total-Pages': {
          description: 'Total number of pages',
          schema: { type: 'string' },
          example: 1,
        },
        'X-Order-By': {
          description: 'Sorting order',
          schema: { type: 'string' },
          example: 'asc',
        },
      },
      example: {
        data: [
          {
            id: 'd2f4e6ce-e77a-4a7c-8dcc-4f4cbebc5ab8',
            name: 'Boba Fett',
            specie: 'HUMAN',
            affiliation: 'BOUNTY_HUNTERS',
            homePlanet: {
              id: 'f395099b-1198-4805-9363-1cbafa5e20d0',
              name: 'Marte',
              climate: 'TEMPERATE',
              terrain: 'GRASSLANDS',
              population: '3',
              StarSystems: {
                id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
                name: 'Sistema Solar',
                description: 'Nosso sistema',
              },
            },
          },
          {
            id: '2c3b93fa-d232-4ff9-8e08-0bdf64bf81af',
            name: 'Din Djarin',
            specie: 'HUMAN',
            affiliation: 'MANDALORIANS',
            homePlanet: {
              id: 'f395099b-1198-4805-9363-1cbafa5e20d0',
              name: 'Marte',
              climate: 'TEMPERATE',
              terrain: 'GRASSLANDS',
              population: '3',
              StarSystems: {
                id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
                name: 'Sistema Solar',
                description: 'Nosso sistema',
              },
            },
          },
          {
            id: '11b24704-369d-4841-bbd7-a568a6946786',
            name: 'John',
            specie: 'YODA_SPECIES',
            affiliation: 'MANDALORIANS',
            homePlanet: {
              id: 'f395099b-1198-4805-9363-1cbafa5e20d0',
              name: 'Marte',
              climate: 'TEMPERATE',
              terrain: 'GRASSLANDS',
              population: '3',
              StarSystems: {
                id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
                name: 'Sistema Solar',
                description: 'Nosso sistema',
              },
            },
          },
        ],
        meta: {
          totalItems: 3,
          currentPage: 1,
          itemsPerPage: 10,
          totalPages: 1,
          orderBy: 'asc',
        },
      },
    }),
  );
};
