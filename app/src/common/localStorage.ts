export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const savedValue = localStorage.getItem(key);
    setSelf(savedValue);

    // @ts-ignore
    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else if (typeof newValue === 'string') {
        localStorage.setItem(key, newValue);
      } else {
        // other data types is not yet supported
      }
    });
  };
