import { MediaListStatus } from "../../api/types";
import { SettingsProps } from "../settings/settingsType";
import { getItemLocalStorage } from "./lsnext";

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

export const getEmoji = (
  settings: SettingsProps,
  status: MediaListStatus
): string => {
  if (status === "COMPLETED") return settings.completed;
  if (status === "CURRENT" && settings.watching) return settings.watching;
  return settings.notCompleted;
};
