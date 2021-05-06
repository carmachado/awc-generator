import { MediaListStatus } from "../../api/types";
import { SettingsProps } from "../settings/settingsType";
import { getItemLocalStorage } from "./lsnext";

export const getSettings = (): SettingsProps => {
  const lsSettings = getItemLocalStorage("@awc-generator:settings");

  const defaultSettings = {
    notCompleted: "O",
    watching: "",
    completed: "X",
    prevCompleted: "",
    previewCards: false,
    language: { value: "romaji", label: "Romaji" },
    centerHeader: false,
    centerBody: false,
  };

  if (lsSettings) return JSON.parse(lsSettings);

  return defaultSettings;
};

export const getEmoji = (
  settings: SettingsProps,
  status: MediaListStatus,
  prevCompleted: boolean
): string => {
  if (status === "COMPLETED") {
    if (prevCompleted && settings.prevCompleted) return settings.prevCompleted;
    return settings.completed;
  }
  if (status === "CURRENT" && settings.watching) return settings.watching;
  return settings.notCompleted;
};
