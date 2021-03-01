import { ChallengeInformation } from "../anime/animeTypes";

const lsnext = typeof window !== "undefined" ? localStorage : null;

export const setItemLocalStorage = (key: string, value: string): void =>
  lsnext?.setItem(key, value);

export const getItemLocalStorage = (key: string): string =>
  lsnext?.getItem(key);

interface ChallengeStorage {
  formData: ChallengeInformation;
  openedManualField: string[];
}

export const getChallengeLocalStorage = (name: string): ChallengeStorage => {
  const challengels = getItemLocalStorage(`@awc-generator:${name}`);

  const data = challengels && JSON.parse(challengels);

  const { formData } = data;

  if (formData) return data;

  return { formData: data, openedManualField: [] };
};

export const setChallengeLocalStorage = (
  name: string,
  challenge: ChallengeStorage
): void => {
  setItemLocalStorage(`@awc-generator:${name}`, JSON.stringify(challenge));
};
