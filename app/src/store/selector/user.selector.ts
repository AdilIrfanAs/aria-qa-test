import { selector } from 'recoil';

import { JwtPayload, parseJwt } from '../../common/jwt';

import { accessTokenAtom } from '../atom/accessToken.atom';
import { User } from '../model/user';

export const userState = selector({
  key: 'user',
  get: ({ get }) => {
    const accessToken = get(accessTokenAtom);

    let result: Partial<User> | null = null;
    if (accessToken) {
      try {
        const jwtPayload = parseJwt(accessToken) as JwtPayload;

        result = {
          email: jwtPayload.email,
          name: jwtPayload.name,
          id: jwtPayload.sub,
        };
      } catch (error) {
        result = null;
      }
    }

    return result;
  },
});
