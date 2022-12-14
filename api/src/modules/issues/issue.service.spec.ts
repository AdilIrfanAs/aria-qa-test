import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import IssueRepository from './issue.repository';
import { IssueService } from './issue.service';

describe('Issue service', () => {
  let service: IssueService;
  const issueRepository = {
    create: jest.fn(),
    findAndPaginate: jest.fn(),
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        IssueService,
        { provide: IssueRepository, useValue: issueRepository },
      ],
    }).compile();

    service = app.get<IssueService>(IssueService);
  });

  describe('service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create an issue', async () => {
      const payload = { name: 'name', description: 'description', score: 90 };

      jest.spyOn(issueRepository, 'create').mockResolvedValue(payload);
      const result = await service.create(payload);

      expect(result).toBeDefined();
      expect(result.name).toEqual(payload.name);
      expect(result.description).toEqual(payload.description);
      expect(result.score).toEqual(payload.score);
    });
  });
});
