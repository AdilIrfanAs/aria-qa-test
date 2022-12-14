export interface PaginationOptions {
  order_by?: string;
  page_size?: number;
  page?: number;
  sort_by?: string;
}

export interface PaginationMeta {
  page_count: number;
  page_size: number;
  page: number;
  total_count: number;
}

export interface FindAndPaginateResult<T> {
  data: T[];
  meta: PaginationMeta;
}
