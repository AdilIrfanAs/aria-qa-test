import { selector } from 'recoil';

export const timezoneOffsetState = selector({
  key: 'timezoneOffset',
  get: () => {
    return Number.parseInt(process.env.REACT_APP_TIMEZONE_OFFSET || '0', 10);
  },
});
