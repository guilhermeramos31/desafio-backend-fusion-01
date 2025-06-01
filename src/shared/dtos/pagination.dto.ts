import { IsIn, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export type OrderBy = 'asc' | 'desc';

export class Pagination {
  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderBy: OrderBy = 'asc';
}
