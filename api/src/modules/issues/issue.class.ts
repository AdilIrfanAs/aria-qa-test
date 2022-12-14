import { ApiProperty } from '@nestjs/swagger';

import { IIssueStatistic } from './issue.interface';

export class IssueStatistic implements IIssueStatistic {
  @ApiProperty({ type: Number })
  total_score: number;

  @ApiProperty({ type: Number })
  total_count: number;

  @ApiProperty({ type: String })
  name: string;
}
