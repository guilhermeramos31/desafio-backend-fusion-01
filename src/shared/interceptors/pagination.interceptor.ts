import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';
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
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  orderBy: OrderBy = 'asc';
}

interface PaginatedResponse<T> {
  data: T;
  pagination?: {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    orderBy?: string;
  };
}

interface DataResponse<T> {
  data: T;
}

@Injectable()
export class PaginationInterceptor<T>
  implements NestInterceptor<DataResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<PaginatedResponse<T>>,
  ): Observable<DataResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      map((paginatedData) => {
        if (paginatedData?.pagination) {
          const { pagination } = paginatedData;
          response.set({
            'X-Total-Items': pagination.totalItems.toString(),
            'X-Current-Page': pagination.currentPage.toString(),
            'X-Items-Per-Page': pagination.itemsPerPage.toString(),
            'X-Total-Pages': pagination.totalPages.toString(),
            'X-Order-By': pagination.orderBy?.toString() || 'asc',
          });
        }

        return {
          data: paginatedData.data,
        };
      }),
    );
  }
}
