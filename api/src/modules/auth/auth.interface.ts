import { IUser } from '../user/user.interface';

export type JwtPayload = Pick<IUser, 'email' | 'name'> & { sub: number };

export interface AccessToken {
  access_token: string;
}
