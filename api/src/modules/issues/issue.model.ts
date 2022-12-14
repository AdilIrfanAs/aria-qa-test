import { Column, DataType, Table } from 'sequelize-typescript';

import { BaseModel } from '../sequelize/sequelize.class';

import { IIssue } from './issue.interface';

@Table({ tableName: 'issue' })
export class Issue extends BaseModel<Issue> implements IIssue {
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  description?: string;

  @Column({
    type: DataType.DECIMAL(14, 4),
  })
  score: number;
}

export default Issue;
