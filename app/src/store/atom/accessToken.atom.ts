import { atom } from 'recoil';

import { localStorageEffect } from '../../common/localStorage';

type AccessToken = string;
export const accessTokenAtom = atom<AccessToken | null>({
  key: 'access_token',
  default: null,
  effects: [localStorageEffect('access_token')],
});
