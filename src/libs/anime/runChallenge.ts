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

const runChallenge = async (
  challenge: Challenge,
  formData: ChallengeInformation
): Promise<string> => {
  const animes: AnimeChallenge[] = challenge.requirements.map(
    ({ id, preset }) => {
      const data = formData.animes && formData.animes[0];
      if (data) return { ...data, reqId: id };

      return { URL: preset, reqId: id };
    }
  );

  const ids = animes.map((anime) => getAnimeID(anime.URL));

  const [media, mediaList] = await Promise.all([
    getMediaAll({ ids }),
    getMediaListAll({ ids, userName: formData.user }),
  ]);

  const arrayInformation: MediaListReq[] = [];

  const promises = animes.map(({ URL, fields: addFields, reqId }) => {
    let fields: string[][];

    if (addFields) {
      if (Array.isArray(addFields[0])) {
        fields = addFields as string[][];
      } else {
        fields = (addFields as string[]).map((f) => [f]);
      }
    }
    const id = getAnimeID(URL);

    let information: MediaList = mediaList.find((ml) => ml.media.id === id);
    if (!information) information = { media: media.find((m) => m.id === id) };

    if (information.media) arrayInformation.push({ ...information, reqId });
    else information = { media: defaultMedia };

    return formatAnimeInformation(
      information,
      challenge.requirements.find((req) => req.id === reqId),
      fields
    );
  });

  let result = await Promise.all(promises);

  if (challenge.run) {
    const promisesRuns = challenge.run.after.map<Promise<string>>(
      (runChallenge) =>
        run[runChallenge.type]({
          mediaLists: arrayInformation,
          settings: getSettings(),
        })
    );

    const runResults = await Promise.all(promisesRuns);

    result = [...result, ...runResults];
  }

  return `<hr>\n\n${result.join("\n\n").trim()}\n`;
};

export default runChallenge;
