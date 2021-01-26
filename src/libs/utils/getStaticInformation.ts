import { SettingsProps } from "../settings/settingsType";
import { getItemLocalStorage } from "./lsnext";

export interface NavigationResponse {
  name: string;
  file?: string;
  childrens?: NavigationResponse[];
  path?: string;
}

export const getNavigationInformation = async (): Promise<
  NavigationResponse[]
> => {
  const resPage = await fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/development/navigation.json`
  );

  return resPage.json();
};

export const getChallengeInformation = async (
  challenge: string
): Promise<unknown> => {
  const promise = await fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/development/challenges/${challenge}.json`
  );

  if (promise.status === 404) return null;

  return promise.json();
};

export const getSettings = (): SettingsProps => {
  const lsSettings = getItemLocalStorage("@awc-generator:settings");

  const defaultSettings = {
    notCompleted: "O",
    watching: "",
    completed: "X",
    previewCards: false,
    language: { value: "romaji", label: "Romaji" },
  };

  if (lsSettings) return JSON.parse(lsSettings);

  return defaultSettings;
};
