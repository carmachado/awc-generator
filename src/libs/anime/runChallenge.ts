import { AnimeChallenge, Challenge, ChallengeInformation } from "./animeTypes";
import getAnimeInformation from "./getAnimeInformation";

const runChallenge = async (
  challenge: Challenge,
  information: ChallengeInformation
): Promise<string> => {
  const animes: AnimeChallenge[] = challenge.requirements.map(
    ({ id, preset }) => {
      const data = information.animes[id];
      if (data) return { ...data, reqId: id };

      return { URL: preset, reqId: id };
    }
  );

  const promises = animes.map(({ URL, fields, reqId }) => {
    return getAnimeInformation({
      anime: URL,
      user: information.user,
      challenge,
      reqId,
      fields,
    });
  });

  const result = await Promise.all(promises);

  return `<hr>\n\n${result.join("\n\n").trim()}\n`;
};

export default runChallenge;
