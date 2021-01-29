import { AIParams, AIFunction } from "../animeTypes";
import Link from "./Link";
import Label from "./Label";

const Episode: AIFunction = async ({ info }: AIParams): Promise<string> => {
  const {
    progress,
    media: { episodes },
  } = info;

  return `Ep: ${progress}/${episodes || "?"}`;
};

const YearSeason: AIFunction = async ({ info }: AIParams): Promise<string> => {
  const { season, seasonYear } = info.media;
  const seasonYearCapitalized =
    season.charAt(0).toUpperCase() + season.slice(1).toLocaleLowerCase();

  return `${seasonYear} and ${seasonYearCapitalized}`;
};

const AdditionalInformationRun = {
  Episode: { Episode },
  YearSeason: { YearSeason },
  Label,
  Link,
};

export const runAdditionalInformation = async (
  type: string,
  subtype: string,
  params: AIParams
): Promise<string> => {
  const additionalRun = AdditionalInformationRun[type];

  const command = additionalRun && additionalRun[subtype || type];

  try {
    if (command) return await command(params);
  } catch (error) {
    return error.message;
  }
  return "";
};
