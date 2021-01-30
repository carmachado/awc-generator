import { FuzzyDate, Requirement } from "./animeTypes";
import { MediaList } from "../../api/types";
import { SettingsProps } from "../settings/settingsType";
import { runAdditionalInformation } from "./additionalInformation/runAdditionalInformation";
import { getSettings } from "../utils/getLocalInformation";

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
  fields?: string[][]
): Promise<string> => {
  const promises = requirement.additionalInformation?.map(
    async (inf, fieldIdx) => {
      const values = fields && fields[fieldIdx];

      return runAdditionalInformation(inf.type, inf.subtype, {
        info,
        field: { ...inf, values },
        settings,
      });
    }
  );
  if (promises) {
    const addInf = await Promise.all(promises);
    return addInf.reduce(
      (prev, curr, index) =>
        `${prev}${
          requirement.additionalInformation[index].splitter
            ? requirement.additionalInformation[index].splitter
            : " // "
        }${curr}`
    );
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
  fields?: string[][]
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

export default formatAnimeInformation;
