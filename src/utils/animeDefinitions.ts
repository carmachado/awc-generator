import { MediaList } from "../api/getMediaList";
import getStaff from "../api/getStaff";

export interface FuzzyDate {
  year: number;
  month: number;
  day: number;
}

interface AdditionInformation {
  type: string;
  subtype?: string;
  field?: string;
  name?: string;
}

export interface Requirement {
  id: number;
  question: string;
  additionalInformation: AdditionInformation[];
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

interface AdditionInformationFields extends AdditionInformation {
  value: string;
}

interface AdditionInformationParams {
  information: MediaList;
  field: AdditionInformationFields;
}

export function getAnimeID(anime: string): number {
  try {
    const animeURL = new URL(anime);
    return Number.parseInt(animeURL.pathname.split("/")[2], 10);
  } catch (error) {
    return Number.parseInt(anime, 10);
  }
}

const AdditionInformationRun = {
  Episode: async ({
    information,
  }: AdditionInformationParams): Promise<string> => {
    const {
      progress,
      media: { episodes },
    } = information;

    return `Ep: ${progress}/${episodes || "?"}`;
  },

  YearSeason: async ({
    information,
  }: AdditionInformationParams): Promise<string> => {
    const { season, seasonYear } = information.media;
    const seasonYearCapitalized =
      season.charAt(0).toUpperCase() + season.slice(1).toLocaleLowerCase();

    return `${seasonYear} and ${seasonYearCapitalized}`;
  },
  Label: async ({ field }: AdditionInformationParams): Promise<string> => {
    return `${field.field}: ${field.value}`;
  },
  Link: async ({ field }: AdditionInformationParams): Promise<string> => {
    if (field.subtype === "Staff") {
      const id = getAnimeID(field.value);
      const { name } = await getStaff({ id });
      return `${field.field}: [${name.full}](${field.value})`;
    }
    return `[${field.field}](${field.value})`;
  },
};

export const runAdditionInformation = async (
  type: string,
  params: AdditionInformationParams
): Promise<string> => {
  const command = AdditionInformationRun[type];
  return command && command(params);
};
