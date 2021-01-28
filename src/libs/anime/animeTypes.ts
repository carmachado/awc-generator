import { MediaList } from "../../api/getMediaList";
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
}

export interface Requirement {
  splitter?: string;
  id: number;
  question: string;
  additionalInformation: AdditionalInformation[];
  required?: boolean;
  preset?: string;
}

export interface Challenge {
  name: string;
  link?: string;
  defaultRequired: boolean;
  requirements: Requirement[];
}

export interface AnimeChallenge {
  reqId: number;
  URL: string;
  fields?: string[][] | string[];
}

export interface ChallengeInformation {
  name: string;
  user: string;
  animes: AnimeChallenge[];
}

export interface AnimeInformation {
  anime: string;
  user: string;
  challenge?: Challenge;
  reqId?: number;
  fields?: string[][];
}
export function getAnimeID(anime: string): number {
  try {
    const animeURL = new URL(anime);
    return Number.parseInt(animeURL.pathname.split("/")[2], 10);
  } catch (error) {
    return Number.parseInt(anime, 10);
  }
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
