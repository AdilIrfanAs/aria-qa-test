import { BaseModel } from '../sequelize/sequelize.interface';

export interface IssueProperty {
  name: string;
  description?: string;
  score: number;
}

export interface IIssue extends BaseModel, IssueProperty {}

export interface IssueRangeQuery {
  created_at_end_date?: Date;
  created_at_start_date?: Date;
}

export interface IIssueStatistic {
  total_score: number;
  total_count: number;
  name: string;
}
