import { AlertCustomOptionsWithType } from "react-alert";
import { defaultMedia, MediaList } from "../../api/types";
import getMediaAll from "../../api/getMediaAll";
import getMediaListAll from "../../api/getMediaListAll";
import {
  AnimeChallenge,
  Challenge,
  ChallengeInformation,
  getAnimeID,
} from "./animeTypes";
import formatAnimeInformation from "./formatAnimeInformation";
import * as run from "./run";
import { getSettings } from "../utils/getLocalInformation";
import { MediaListReq } from "./run/runTypes";
import formatFuzzyDate from "../utils/formatFuzzyDate";
import { Alert } from "../../styles/global";

interface Alert {
  message: string;
  options: AlertCustomOptionsWithType;
}
interface ChallengeCode {
  code: string;
  alerts: Alert[];
}

const compareAnimeChallenges = (
  a: AnimeChallenge,
  b: AnimeChallenge
): number => {
  return `${a.mode?.value}-${
    a.replacement ? a.replacement.value : a.requirement.id
  }`.localeCompare(
    `${b.mode?.value}-${b.replacement ? b.replacement.value : b.requirement.id}`
  );
};

const getAlerts = (
  challanges: AnimeChallenge[],
  challenge: Challenge
): Alert[] => {
  const alerts: Alert[] = [];

  if (challenge.modes) {
    const modesQty = {};

    challanges.forEach(({ mode: { value } }) => {
      if (!modesQty[value]) modesQty[value] = 0;
      modesQty[value] += 1;
    });

    challenge.modes.forEach((mode) => {
      if (modesQty[mode.value] > 0 && modesQty[mode.value] < mode.quantity) {
        alerts.push({
          message: `Expected ${mode.quantity} animes to ${
            mode.label
          } mode, but found ${modesQty[mode.value]}`,
          options: { type: "error", timeout: 10000 },
        });
      }
    });
  }

  return alerts;
};

const runChallenge = async (
  challenge: Challenge,
  formData: ChallengeInformation
): Promise<ChallengeCode> => {
  const challegenCode: ChallengeCode = {
    code: "",
    alerts: [],
  };

  const animes: AnimeChallenge[] = challenge.requirements.map((requirement) => {
    const data =
      formData.animes &&
      formData.animes.find((data) => data.requirement.id === requirement.id);
    if (data) return { ...data, requirement };

    return { URL: requirement.preset, requirement };
  });

  const ids = animes.map((anime) => getAnimeID(anime.URL));

  const [media, mediaList] = await Promise.all([
    getMediaAll({ ids }),
    getMediaListAll({ ids, userName: formData.user }),
  ]);

  const arrayInformation: MediaListReq[] = [];
  let finishDate = "";
  let showPrevCompletedLegend = false;

  const sortedAnime = animes.sort(compareAnimeChallenges);

  challegenCode.alerts = getAlerts(sortedAnime, challenge);

  const startDate = formatFuzzyDate({
    day: formData.startDate?.getDate(),
    month: formData.startDate?.getMonth() + 1,
    year: formData.startDate?.getFullYear(),
  });

  const promises = sortedAnime.map(
    ({ URL, fields: addFields, requirement, manualField, mode }, index) => {
      let fields: string[][];

      if (addFields) {
        if (Array.isArray(addFields[0])) {
          fields = addFields as string[][];
        } else {
          fields = (addFields as string[]).map((f) => [f]);
        }
      }

      if (URL === "" && challenge.autoOccult) {
        return "";
      }

      const showMode =
        index === 0
          ? challenge.modes !== undefined
          : mode &&
            sortedAnime[index - 1].mode &&
            mode.value !== sortedAnime[index - 1].mode.value;

      const id = getAnimeID(URL);

      let information: MediaList = mediaList.find((ml) => ml.media.id === id);
      if (!information) information = { media: media.find((m) => m.id === id) };

      if (information.media)
        arrayInformation.push({ ...information, reqId: requirement.id });
      else information = { media: defaultMedia };

      if (
        finishDate !== "YYYY-MM-DD" &&
        formatFuzzyDate(information.completedAt) > finishDate
      ) {
        finishDate = formatFuzzyDate(information.completedAt);
      }

      const prevCompleted =
        challenge.previouslyCompleted &&
        startDate > formatFuzzyDate(information.completedAt) &&
        formatFuzzyDate(information.completedAt) !== "YYYY-MM-DD";
      if (prevCompleted) showPrevCompletedLegend = true;

      return formatAnimeInformation(
        information,
        requirement,
        fields,
        manualField,
        challenge.modes?.find((m) => m.value === mode.value),
        showMode,
        prevCompleted
      );
    }
  );

  let result = await Promise.all(promises);

  const settings = getSettings();

  if (challenge.run) {
    const promisesRuns = challenge.run.after.map<Promise<string>>(
      (runChallenge) =>
        run[runChallenge.type]({
          mediaLists: arrayInformation,
          settings,
          challenge,
          startDate,
        })
    );

    const runResults = await Promise.all(promisesRuns);

    result = [...result, ...runResults];
  }

  result = result.filter((run) => run.trim() !== "");

  if (finishDate !== "YYYY-MM-DD" && startDate > finishDate) {
    finishDate = startDate;
  }

  let header = `# __${challenge.name}__\n\n`;

  header += `Challenge Start Date: ${startDate}\n`;
  header += `Challenge Finish Date: ${finishDate}\n`;
  header += `Legend: [${settings.completed}] = Completed `;
  header += `${settings.watching && `[${settings.watching}] = Watching `}`;
  header += `[${settings.notCompleted}] = Not Completed`;
  if (showPrevCompletedLegend && settings.prevCompleted)
    header += ` [${settings.prevCompleted}] = Previously completed`;

  header += "\n";

  let body = `\n<hr>\n\n${result.join("\n\n").trim()}\n`;

  if (settings.centerHeader) header = `~~~\n${header}~~~`;
  if (settings.centerBody) body = `~~~${body}\n~~~`;

  const formattedChallenge = `${header}${body}`;

  challegenCode.code = formattedChallenge;
  return challegenCode;
};

export default runChallenge;
