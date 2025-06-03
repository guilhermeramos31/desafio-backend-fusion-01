import { PaginatedResponse } from '@shared/interceptors';
import { Planet } from '@planet/entity/planet.entity';

export class PlanetPaginationOutput implements PaginatedResponse<Planet[]> {
  data: Planet[];
  meta?:
    | {
        totalItems: number;
        currentPage: number;
        itemsPerPage: number;
        totalPages: number;
        orderBy?: string;
      }
    | undefined;
}
