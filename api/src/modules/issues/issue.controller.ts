import {
  Controller,
  Logger,
  Post,
  UseGuards,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiQuery,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { IssueService } from './issue.service';
import {
  CreateIssuePayload,
  CreateIssueRes,
  GetIssuesQuery,
  GetIssuesRes,
  GetIssuesStatisticsQuery,
  GetIssuesStatisticsRes,
} from './issue.dto';

@Controller({ path: 'issue' })
@ApiTags('issue')
export class IssueController {
  private readonly logger = new Logger(IssueController.name);

  constructor(private readonly issueService: IssueService) {}

  @Post()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create an issue' })
  @ApiCreatedResponse({ type: CreateIssueRes })
  @ApiBody({ type: CreateIssuePayload })
  async createIssue(@Body() body: CreateIssuePayload) {
    try {
      return await this.issueService.create(body);
    } catch (error) {
      this.logger.error('@createIssue:error', error);
      throw error;
    }
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get issues' })
  @ApiOkResponse({ type: GetIssuesRes })
  async getIssues(@Query() query: GetIssuesQuery) {
    try {
      const { created_at_start_date, created_at_end_date, ...paginateOptions } =
        query;

      return await this.issueService.findAndPaginate(paginateOptions, {
        created_at_start_date,
        created_at_end_date,
      });
    } catch (error) {
      this.logger.error('@getIssues:error', error);
      throw error;
    }
  }

  @Get('statistics')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get issues statistics' })
  @ApiOkResponse({ type: GetIssuesStatisticsRes })
  async getIssuesStatistics(@Query() query: GetIssuesStatisticsQuery) {
    try {
      const { created_at_start_date, created_at_end_date } = query;

      return await this.issueService.getStatistics({
        created_at_start_date,
        created_at_end_date,
      });
    } catch (error) {
      this.logger.error('@getIssuesStatistics:error', error);
      throw error;
    }
  }
}
