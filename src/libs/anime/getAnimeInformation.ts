import getMediaList, { MediaList } from "../../api/getMediaList";
import {
  AnimeInformation,
  FuzzyDate,
  Requirement,
  getAnimeID,
} from "./animeTypes";
import { runAdditionalInformation } from "./additionalInformation/runAdditionalInformation";
import getMedia from "../../api/getMedia";
import { getSettings } from "../utils/getStaticInformation";
import { SettingsProps } from "../settings/settingsType";

function formatFuzzyDate(date: FuzzyDate): string {
  if (!date || !date.year) return "YYYY-MM-DD";

  const { year, month, day } = date;

  return new Date(year, month, day).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const formatAdditionalInformation = async (
  info: MediaList,
  settings: SettingsProps,
  requirement?: Requirement,
  fields?: string[]
): Promise<string> => {
  const promises = requirement.additionalInformation?.map(
    async (inf, fieldIdx) => {
      const value = fields && fields[fieldIdx].trim();

      return runAdditionalInformation(inf.type, inf.subtype, {
        info,
        field: { ...inf, value },
        settings,
      });
    }
  );
  if (promises) {
    const addInf = await Promise.all(promises);
    return addInf.reduce((prev, curr) => `${prev} // ${curr}`);
  }
  return "";
};

const getEmoji = (settings: SettingsProps, status: string): string => {
  if (status === "COMPLETED") return settings.completed;
  if (status === "CURRENT" && settings.watching) return settings.watching;
  return settings.notCompleted;
};

const formatAnimeInformation = async (
  information: MediaList,
  requirement?: Requirement,
  fields?: string[]
): Promise<string> => {
  const {
    status,
    startedAt,
    completedAt,
    media: { id, title },
  } = information;

  const settings = getSettings();
  const { value: language } = settings.language;

  let formattedAnime = "";

  if (settings.previewCards) {
    formattedAnime += `https://anilist.co/anime/${id}`;
  } else {
    formattedAnime += `[${title[language]}](https://anilist.co/anime/${id})`;
  }

  formattedAnime += `\nStart: ${formatFuzzyDate(startedAt)}`;
  formattedAnime += ` Finish: ${formatFuzzyDate(completedAt)}`;

  if (requirement) {
    const reqId = requirement.id.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });

    formattedAnime = `${reqId}) [${getEmoji(settings, status)}] __${
      requirement.question
    }__\n${formattedAnime}`;

    if (requirement.splitter)
      formattedAnime = `${requirement.splitter}\n${formattedAnime}`;

    const additionalInformation = await formatAdditionalInformation(
      information,
      settings,
      requirement,
      fields
    );

    if (additionalInformation) formattedAnime += ` // ${additionalInformation}`;
  }

  return formattedAnime;
};

const getAnimeInformation = async ({
  anime,
  user,
  challenge,
  requerementId,
  fields,
}: AnimeInformation): Promise<string> => {
  const animeID = getAnimeID(anime);

  if (!animeID) {
    return "Not found.";
  }

  let information: MediaList;
  try {
    try {
      information = await getMediaList({ id: animeID, userName: user });
    } catch (error) {
      const media = await getMedia({ id: animeID });
      information = { media };
    }

    if (information) {
      return await formatAnimeInformation(
        information,
        challenge &&
          challenge.requirements.find((req) => req.id === requerementId),
        fields
      );
    }
  } catch (error) {
    return error.message;
  }

  return "Not found.";
};

export default getAnimeInformation;
