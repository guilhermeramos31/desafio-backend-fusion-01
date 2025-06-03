import { PaginatedResponse } from '@shared/interceptors';
import { Character } from '@character/entities/character.entity';

export class CharacterPaginationOutput
  implements PaginatedResponse<Character[]>
{
  data: Character[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    orderBy?: string | undefined;
    totalItems: number;
    totalPages: number;
  };
}
