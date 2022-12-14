import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const jwtService = { sign: jest.fn() };
  const userService = { create: jest.fn(), findByEmail: jest.fn() };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtService },
        { provide: UserService, useValue: userService },
      ],
    }).compile();

    service = app.get<AuthService>(AuthService);
  });

  describe('service', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const password = 'password';
      const hashedPassword = await service.hashPassword(password);
      expect(hashedPassword).toBeDefined();
    });
  });

  describe('comparePasswords', () => {
    it('should return true if passwords match', async () => {
      const password = 'password';
      const hashedPassword = await service.hashPassword(password);
      const passwordsMatch = await service.comparePasswords(
        hashedPassword,
        password,
      );
      expect(passwordsMatch).toBeTruthy();
    });
  });

  describe('signIn', () => {
    it('should return a jwt token', async () => {
      jest.spyOn(userService, 'findByEmail').mockResolvedValue({
        id: 'id',
        email: 'email',
        password:
          'ec2604ee1799d3011a8405369e13dfbdcbf59c91b124dc9d0ab4990a1bbf7826ee4747b447ae2040d2e346f2317c20855b69c5ad883d16099c2a0e380216770d.9175ca4d6dc8ca8a',
      });
      jest.spyOn(jwtService, 'sign').mockReturnValue('token');

      const result = await service.signIn({
        email: 'email',
        password: 'admin',
      });

      expect(result.access_token).toBeDefined();
      expect(result.access_token).toEqual('token');
    });
  });

  describe('registerUser', () => {
    it('should create a user', async () => {
      jest.spyOn(userService, 'create').mockResolvedValue({
        id: 'id',
        email: 'email',
        created_at: 'date',
        name: 'name',
      });

      const result = await service.registerUser({
        email: 'email',
        password: 'password',
        name: 'name',
      });

      expect(result).toBeDefined();
      expect(result.email).toEqual('email');
      expect(result.name).toEqual('name');
      expect(result.created_at).toEqual('date');
    });
  });
});
