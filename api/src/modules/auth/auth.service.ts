import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { pick } from 'lodash';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';

import { AccessToken, JwtPayload } from './auth.interface';
import { SignInPayload, SignUpPayload, SignUpRes } from './auth.dto';

const scryptAsync = promisify(scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const buf = (await promisify(scrypt)(password, salt, 64)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  async comparePasswords(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');

    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    const hashedSuppliedPassword = buf.toString('hex');

    return hashedSuppliedPassword === hashedPassword;
  }

  private async validateUser(
    user: IUser,
    suppliedPassword: string,
  ): Promise<boolean> {
    return this.comparePasswords(user.password, suppliedPassword);
  }

  async signIn(payload: SignInPayload): Promise<AccessToken | null> {
    const user = await this.userService.findByEmail(payload.email);

    if (!user || !(await this.validateUser(user, payload.password))) {
      return null;
    }

    const jwtPayload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }

  async registerUser(payload: SignUpPayload): Promise<SignUpRes> {
    const user = await this.userService.create({
      email: payload.email,
      name: payload.name,
      password: await this.hashPassword(payload.password),
    });

    return pick(user, ['email', 'name', 'created_at']);
  }
}
