import { MediaList } from "../../api/getMediaList";
import getMediaAll from "../../api/getMediaAll";
import getMediaListAll from "../../api/getMediaListAll";
import {
  AnimeChallenge,
  Challenge,
  ChallengeInformation,
  getAnimeID,
} from "./animeTypes";
import { formatAnimeInformation } from "./getAnimeInformation";

const runChallenge = async (
  challenge: Challenge,
  formData: ChallengeInformation
): Promise<string> => {
  const animes: AnimeChallenge[] = challenge.requirements.map(
    ({ id, preset }) => {
      const data = formData.animes[id];
      if (data) return { ...data, reqId: id };

      return { URL: preset, reqId: id };
    }
  );

  const ids = animes.map((anime) => getAnimeID(anime.URL));

  const [media, mediaList] = await Promise.all([
    getMediaAll({ ids }),
    getMediaListAll({ ids, userName: formData.user }),
  ]);

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

    return formatAnimeInformation(
      information,
      challenge.requirements.find((req) => req.id === reqId),
      fields
    );
  });

  const result = await Promise.all(promises);

  return `<hr>\n\n${result.join("\n\n").trim()}\n`;
};

export default runChallenge;
