import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface PaginatedResponse<T> {
  data: T;
  meta?: {
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
  implements NestInterceptor<DataResponse<T>, PaginatedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<PaginatedResponse<T>>,
  ): Observable<PaginatedResponse<T>> {
    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse<Response>();

    return next.handle().pipe(
      map((paginatedData) => {
        if (paginatedData?.meta) {
          const { meta } = paginatedData;
          response.set({
            'X-Total-Items': meta.totalItems.toString(),
            'X-Current-Page': meta.currentPage.toString(),
            'X-Items-Per-Page': meta.itemsPerPage.toString(),
            'X-Total-Pages': meta.totalPages.toString(),
            'X-Order-By': meta.orderBy?.toString() || 'asc',
          });
        }

        return paginatedData;
      }),
    );
  }
}
