import { ChallengeMode, getTitle, Requirement } from "./animeTypes";
import { MediaList } from "../../api/types";
import { SettingsProps } from "../settings/settingsType";
import { runAdditionalInformation } from "./additionalInformation/runAdditionalInformation";
import { getEmoji, getSettings } from "../utils/getLocalInformation";
import formatFuzzyDate, { getDigits } from "../utils/formatFuzzyDate";
import replaceVars from "../utils/replaceVars";

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
  showMode?: boolean,
  prevCompleted?: boolean
): Promise<string> => {
  const {
    status,
    startedAt,
    completedAt,
    media: { id, title },
  } = information;

  const settings = getSettings();

  const formatted = {
    anime: getTitle(id, title, settings),
    start: formatFuzzyDate(startedAt),
    finish: formatFuzzyDate(completedAt),
    id: "",
    emoji: "",
    question: "",
    additionalInformation: "",
    header: "",
    format: "{anime}\nStart: {start} Finish: {finish}",
  };

  if (requirement) {
    if (requirement.customFormat) formatted.format = requirement.customFormat;
    else
      formatted.format =
        "{id}) [{emoji}] __{question}__\n{anime}\nStart: {start} Finish: {finish}";

    if (requirement.splitter) formatted.header += `${requirement.splitter}\n`;

    if (showMode) formatted.header += `__Mode: ${mode?.label}__\n\n`;

    formatted.id = getDigits(requirement.id, 2);
    formatted.emoji = getEmoji(settings, status, prevCompleted);
    formatted.question = requirement.question;

    const additionalInformation = await formatAdditionalInformation(
      information,
      settings,
      requirement,
      fields
    );

    if (additionalInformation)
      formatted.additionalInformation += ` // ${additionalInformation}`;

    if (manualField) formatted.additionalInformation += ` // ${manualField}`;

    if (prevCompleted && !settings.prevCompleted)
      formatted.additionalInformation += ` // Previously completed`;
  }

  return (
    formatted.header +
    (await replaceVars(formatted, formatted.format)) +
    formatted.additionalInformation
  );
};

export default formatAnimeInformation;
