import { Global, Module } from '@nestjs/common';

import { IssueController } from './issue.controller';
import IssueRepository from './issue.repository';
import { IssueService } from './issue.service';

@Global()
@Module({
  controllers: [IssueController],
  providers: [IssueRepository, IssueService],
  exports: [],
})
export class IssueModule {}
