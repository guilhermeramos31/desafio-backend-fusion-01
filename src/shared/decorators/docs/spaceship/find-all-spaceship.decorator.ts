import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiFindAllSpaceship = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'Get all spaceships with pagination',
      description:
        'Returns a paginated list of spaceships. Allows you to control the page, quantity per page and ordering.',
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
            id: '832cf15d-2879-4ff7-a7d5-6ebab0b5a9af',
            name: 'ASdaw',
            model: 'N33-as',
            manufacturer: 'ship',
            passengerCapacity: 100,
          },
        ],
        meta: {
          totalItems: 1,
          currentPage: 1,
          itemsPerPage: 10,
          totalPages: 1,
          orderBy: 'asc',
        },
      },
    }),
  );
};
