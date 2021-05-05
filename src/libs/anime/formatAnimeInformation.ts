import { ChallengeMode, getTitle, Requirement } from "./animeTypes";
import { MediaList } from "../../api/types";
import { SettingsProps } from "../settings/settingsType";
import { runAdditionalInformation } from "./additionalInformation/runAdditionalInformation";
import { getEmoji, getSettings } from "../utils/getLocalInformation";
import formatFuzzyDate, { getDigits } from "../utils/formatFuzzyDate";

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

const formatAnimeInformation = async (
  information: MediaList,
  requirement?: Requirement,
  fields?: string[][],
  manualField?: string,
  mode?: ChallengeMode,
  showMode?: boolean
): Promise<string> => {
  const {
    status,
    startedAt,
    completedAt,
    media: { id, title },
  } = information;

  const settings = getSettings();

  let formattedAnime = "";

  const formattedTitle = getTitle(title, settings);

  if (settings.previewCards) {
    formattedAnime += `https://anilist.co/anime/${id}`;
  } else {
    formattedAnime += `[${formattedTitle}](https://anilist.co/anime/${id})`;
  }

  formattedAnime += `\nStart: ${formatFuzzyDate(startedAt)}`;
  formattedAnime += ` Finish: ${formatFuzzyDate(completedAt)}`;

  if (requirement) {
    const reqId = getDigits(requirement.id, 2);

    formattedAnime = `${reqId}) [${getEmoji(settings, status)}] __${
      requirement.question
    }__\n${formattedAnime}`;

    if (requirement.splitter)
      formattedAnime = `${requirement.splitter}\n${formattedAnime}`;

    if (showMode)
      formattedAnime = `__Mode: ${mode?.label}__\n\n${formattedAnime}`;

    const additionalInformation = await formatAdditionalInformation(
      information,
      settings,
      requirement,
      fields
    );

    if (additionalInformation) formattedAnime += ` // ${additionalInformation}`;

    if (manualField) formattedAnime += ` // ${manualField}`;
  }

  return formattedAnime;
};

export default formatAnimeInformation;
