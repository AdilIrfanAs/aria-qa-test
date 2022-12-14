import { Buffer } from 'buffer';

import { User } from '../store/model/user';

export type JwtPayload = Pick<User, 'email' | 'name'> & {
  sub: number;
  iat: number;
  exp: number;
};

export const parseJwt = (accessToken: string) => {
  return JSON.parse(
    Buffer.from(accessToken.split('.')[1], 'base64').toString(),
  );
};
