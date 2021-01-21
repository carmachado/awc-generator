const lsnext = typeof window !== "undefined" ? localStorage : null;

export const setItemLocalStorage = (key: string, value: string): void =>
  lsnext?.setItem(key, value);

export const getItemLocalStorage = (key: string): string =>
  lsnext?.getItem(key);
