import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery } from '@nestjs/swagger';

export const ApiFindAllStarSystem = () => {
  return applyDecorators(
    ApiOperation({
      summary: 'List star systems with pagination',
      description:
        'Returns a paginated list of star systems. Allows you to control the page, quantity per page and ordering.',
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
      description: 'List of star systems returned successfully',
      example: {
        data: [
          {
            id: 'd21a2f54-b16d-4034-84a4-25f1b6d5c3d0',
            name: 'Sistema Alfa Centauri',
            description: 'Sistema estelar mais próximo do Sol',
          },
          {
            id: 'e41a9a98-1b83-4f5a-9bb3-61c512dfdd10',
            name: 'Sistema Proxima',
            description: 'Sistema com planeta potencialmente habitável',
          },
          {
            id: 'fd97c9a2-69d7-45a7-8d6f-1b6bb9381b0a',
            name: 'Sistema Kepler-452',
            description: 'Possui planeta semelhante à Terra',
          },
        ],
      },
    }),
  );
};
