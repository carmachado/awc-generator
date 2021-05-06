import { MediaList, MediaTitle } from "../../api/types";
import { SelectOption } from "../../components/Select";
import { SettingsProps } from "../settings/settingsType";

export interface FuzzyDate {
  year: number;
  month: number;
  day: number;
}

export interface AdditionalInformation {
  type: string;
  subtype?: string;
  field?: string;
  fields?: string[];
  name?: string;
  splitter?: string;
  occultField?: boolean;
  runAfter?: string;
}

export interface Requirement {
  splitter?: string;
  id: string;
  question: string;
  description?: string;
  additionalInformation: AdditionalInformation[];
  required?: boolean;
  preset?: string;
  type?: "bonus";
}

export interface ChallengeMode extends SelectOption {
  quantity: number;
}

export interface Challenge {
  name: string;
  link?: string;
  defaultRequired: boolean;
  autoOccult?: boolean;
  run?: { after?: { type: string }[] };
  type?: "genre";
  previouslyCompleted?: boolean;
  requirements: Requirement[];
  modes: ChallengeMode[];
}

export interface AnimeChallenge {
  requirement: Requirement;
  URL: string;
  fields?: string[][] | string[];
  manualField?: string;
  mode?: SelectOption;
  replacement?: SelectOption;
}

export interface ChallengeInformation {
  name: string;
  user: string;
  startDate: Date;
  animes: AnimeChallenge[];
}

export interface AnimeInformation {
  anime: string;
  user: string;
  challenge?: Challenge;
  reqId?: string;
  fields?: string[][];
}
export interface AdditionalInformationFields extends AdditionalInformation {
  values?: string[];
}

export interface AIParams {
  info: MediaList;
  field: AdditionalInformationFields;
  settings: SettingsProps;
}

export type AIFunction = (params: AIParams) => Promise<string>;

export function getAnimeID(anime: string): number {
  try {
    const animeURL = new URL(anime);
    return Number.parseInt(animeURL.pathname.split("/")[2], 10);
  } catch (error) {
    return Number.parseInt(anime, 10);
  }
}

export const getField = ({
  field,
  occultField,
}: AdditionalInformationFields): string => {
  if (occultField) return "";
  return `${field}: `;
};

export const getTitle = (
  title: MediaTitle,
  settings: SettingsProps
): string => {
  return title[settings.language.value] || title.romaji;
};
