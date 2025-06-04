import { PaginatedResponse } from '@shared/interceptors';
import { Spaceship } from '@spaceship/entities/spaceship.entity';

export class SpaceshipPaginationOutput
  implements PaginatedResponse<Spaceship[]>
{
  data: Spaceship[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    orderBy?: string | undefined;
    totalItems: number;
    totalPages: number;
  };
}
