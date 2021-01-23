import { SettingsProps } from "../settings/settingsType";
import { getItemLocalStorage } from "./lsnext";

interface Response {
  name: string;
}

export const getNavigationInformation = async (): Promise<string[]> => {
  const resPage = await fetch(
    `https://api.github.com/repos/carmachado/awc-generator-json/contents/`
  );

  const dataPage = await resPage.json();

  return (dataPage as Response[])
    .filter((res) => res.name.endsWith(".json"))
    .map((res) => res.name.replace(".json", " "));
};

export const getChallengeInformation = async (
  challenge: string
): Promise<unknown> => {
  const promise = await fetch(
    `https://raw.githubusercontent.com/carmachado/awc-generator-json/master/${challenge}.json`
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
