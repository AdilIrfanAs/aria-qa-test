import moment from 'moment';
import { selector } from 'recoil';

import { JwtPayload, parseJwt } from '../../common/jwt';

import { accessTokenAtom } from '../atom/accessToken.atom';

export const expiryState = selector({
  key: 'expiry',
  get: ({ get }) => {
    const accessToken = get(accessTokenAtom);

    let result = true;
    if (accessToken) {
      try {
        const jwtPayload = parseJwt(accessToken) as JwtPayload;

        result = moment.unix(jwtPayload.exp).isBefore(moment());
      } catch (error) {
        result = true;
      }
    }

    return result;
  },
});
