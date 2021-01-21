import { NextApiRequest, NextApiResponse } from "next";
import { Challenge } from "../../utils/anime/animeDefinitions";
import ChallengeInformation from "../../utils/anime/ChallengeInformation";
import getAnimeInformation from "../../utils/anime/getAnimeInformation";
import { getChallengeInformation } from "../../utils/getStaticInformation";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const { user, name, animes } = JSON.parse(req.body) as ChallengeInformation;

    let challenge: Challenge;
    if (name) {
      const challengeJSON = await getChallengeInformation(name);
      challenge = challengeJSON as Challenge;
    }

    const promises = animes
      .filter((anime) => anime)
      .map(({ URL, fields, requerementId }) => {
        return getAnimeInformation({
          anime: URL,
          user,
          challenge,
          requerementId,
          fields,
        });
      });

    const animeInformation = await Promise.all(promises);

    res.json({ data: animeInformation });
  } else {
    res.redirect("/404");
  }
};

export default handler;
