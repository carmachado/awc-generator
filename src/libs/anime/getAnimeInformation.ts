import getMediaList from "../../api/getMediaList";
import { MediaList } from "../../api/types";
import { AnimeInformation, getAnimeID } from "./animeTypes";
import getMedia from "../../api/getMedia";
import formatAnimeInformation from "./formatAnimeInformation";

const getAnimeInformation = async ({
  anime,
  user,
  challenge,
  reqId,
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
        challenge && challenge.requirements.find((req) => req.id === reqId),
        fields
      );
    }
  } catch (error) {
    return error.message;
  }

  return "Not found.";
};

export default getAnimeInformation;
