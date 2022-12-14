import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import UserRepository from './user.repository';
import { UserService } from './user.service';

describe('User service', () => {
  let service: UserService;
  const userRepository = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: UserRepository, useValue: userRepository },
      ],
    }).compile();

    service = app.get<UserService>(UserService);
  });

  describe('service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('create', () => {
    it('should create an user', async () => {
      const payload = {
        name: 'name',
        email: 'email',
        password: 'password',
      };
      jest.spyOn(userRepository, 'create').mockResolvedValue(payload);
      const result = await service.create(payload);

      expect(result).toBeDefined();
      expect(result.name).toEqual(payload.name);
      expect(result.email).toEqual(payload.email);
      expect(result.password).toEqual(payload.password);
    });
  });
});
