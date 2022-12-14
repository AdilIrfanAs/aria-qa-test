import { isNil, isEmpty } from 'lodash';

// code snippet with modification from https://stackoverflow.com/a/47962663
export type Params = Record<string, string | number>;

export const paramsToQueryString = (params: Params) => {
  if (!params || isEmpty(params)) return '';

  const keyValuePairs = [];
  for (const key in params) {
    if (!isNil(params[key])) {
      keyValuePairs.push(
        encodeURIComponent(key) +
          '=' +
          encodeURIComponent(params[key] as string | number),
      );
    }
  }

  return keyValuePairs.join('&');
};
