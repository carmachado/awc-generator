import { MediaList } from "../../api/getMediaList";

export interface FuzzyDate {
  year: number;
  month: number;
  day: number;
}

export interface AdditionalInformation {
  type: string;
  subtype?: string;
  field?: string;
  name?: string;
}

export interface Requirement {
  splitter?: string;
  id: number;
  question: string;
  additionalInformation: AdditionalInformation[];
  required?: boolean;
}

export interface Challenge {
  name: string;
  link?: string;
  defaultRequired: boolean;
  requirements: Requirement[];
}

export interface AnimeInformation {
  anime: string;
  user: string;
  challenge?: Challenge;
  requerementsIndex?: number;
  fields?: string[];
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
  value: string;
}

export interface AIParams {
  info: MediaList;
  field: AdditionalInformationFields;
}

export type AIFunction = (params: AIParams) => Promise<string>;
