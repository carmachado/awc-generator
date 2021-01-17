import getMediaList, { MediaList } from "../api/getMediaList";
import {
  runAdditionInformation,
  AnimeInformation,
  FuzzyDate,
  Requirement,
  getAnimeID,
} from "./animeDefinitions";

function formatFuzzyDate({ year, month, day }: FuzzyDate): string {
  if (!year) return "YYYY-MM-DD";

  return new Date(year, month, day).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

const formatAdditionalInformation = async (
  information: MediaList,
  requirement?: Requirement,
  fields?: string[]
): Promise<string> => {
  const promises = requirement.additionalInformation?.map(
    async (inf, fieldIdx) => {
      const value = fields && fields[fieldIdx];

      return runAdditionInformation(inf.type, {
        information,
        field: { ...inf, value },
      });
    }
  );
  if (promises) {
    const addInf = await Promise.all(promises);
    return addInf.reduce((prev, curr) => `${prev} // ${curr}`);
  }
  return "";
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
    media: {
      id,
      title: { romaji },
    },
  } = information;

  let formattedAnime = `[${romaji}](https://anilist.co/anime/${id})\nStart: ${formatFuzzyDate(
    startedAt
  )} Finish: ${formatFuzzyDate(completedAt)}`;

  if (requirement) {
    const reqId = requirement.id.toLocaleString(undefined, {
      minimumIntegerDigits: 2,
    });

    formattedAnime = `${reqId}) [${status === "COMPLETED" ? "X" : "O"}] __${
      requirement.question
    }__\n${formattedAnime}`;

    const additionalInformation = await formatAdditionalInformation(
      information,
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
  requerementsIndex,
  fields,
}: AnimeInformation): Promise<string> => {
  const animeID = getAnimeID(anime);

  if (!animeID) {
    return "Not found.";
  }

  try {
    const information = await getMediaList({ id: animeID, userName: user });

    if (information) {
      localStorage.setItem("@awc-generator:username", user);

      return await formatAnimeInformation(
        information,
        challenge &&
          challenge.requirements.find((req) => req.id === requerementsIndex),
        fields
      );
    }
  } catch (error) {
    return error.message;
  }

  return "Not found.";
};

export default getAnimeInformation;
