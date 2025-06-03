import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiFindAllPlanet = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all planets with pagination',
      description:
        'Returns a paginated list of planet. Allows you to control the page, quantity per page and ordering.',
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
            id: 'f395099b-1198-4805-9363-1cbafa5e20d0',
            name: 'Marte',
            climate: 'TEMPERATE',
            terrain: 'GRASSLANDS',
            population: '0',
            StarSystems: {
              id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
              name: 'Sistema Solar',
              description: 'Nosso sistema',
            },
          },
          {
            id: '083b9d54-eecd-4b1f-ab8b-3afe1dd26fa6',
            name: 'Plutão',
            climate: 'TEMPERATE',
            terrain: 'GRASSLANDS',
            population: '0',
            StarSystems: {
              id: '5ebfe608-bc55-4f66-a2ab-7652de1456b7',
              name: 'Sistema Solar',
              description: 'Nosso sistema',
            },
          },
        ],
        meta: {
          totalItems: 2,
          currentPage: 1,
          itemsPerPage: 10,
          totalPages: 1,
          orderBy: 'asc',
        },
      },
    }),
  );
};
