import { Injectable, Logger } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { PaginationOptions } from 'src/common/interface/pagination';

import { IIssue, IssueRangeQuery } from './issue.interface';
import IssueRepository from './issue.repository';

@Injectable()
export class IssueService {
  private readonly logger = new Logger(IssueService.name);

  constructor(private readonly issueRepository: IssueRepository) {}

  create(issue: Partial<IIssue>, transaction?: Transaction) {
    return this.issueRepository.create(issue, transaction);
  }

  findAndPaginate(
    options: PaginationOptions = {},
    params: Partial<IIssue> & IssueRangeQuery = {},
  ) {
    return this.issueRepository.findAndPaginate(options, params);
  }

  getStatistics(params: IssueRangeQuery = {}) {
    return this.issueRepository.getStatistics(params);
  }
}
