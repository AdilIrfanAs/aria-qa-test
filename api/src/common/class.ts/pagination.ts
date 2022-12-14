import { ApiProperty } from '@nestjs/swagger';

export class PaginationMeta {
  @ApiProperty({ type: Number })
  page_count: number;

  @ApiProperty({ type: Number })
  page_size: number;

  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  total_count: number;
}
