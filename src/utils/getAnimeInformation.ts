import getMediaList from "../api/getMediaList";

interface FuzzyDate {
  year: number;
  month: number;
  day: number;
}

export interface AnimeInformation {
  anime: string;
  user: string;
}

function formatFuzzyDate({ year, month, day }: FuzzyDate): string {
  if (!year) return "YYYY-MM-DD";

  return new Date(year, month, day).toLocaleDateString("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

function getAnimeID(anime: string): { animeID: number; animeURL: string } {
  try {
    const animeURL = new URL(anime);
    return {
      animeID: Number.parseInt(animeURL.pathname.split("/")[2], 10),
      animeURL: animeURL.toString(),
    };
  } catch (error) {
    return {
      animeID: Number.parseInt(anime, 10),
      animeURL: `https://anilist.co/anime/${anime}`,
    };
  }
}

const getAnimeInformation = async ({
  anime,
  user,
}: AnimeInformation): Promise<string> => {
  const { animeID, animeURL } = getAnimeID(anime);

  if (!animeID) {
    return "Not found.";
  }

  try {
    const information = await getMediaList({ id: animeID, userName: user });

    if (information) {
      localStorage.setItem("@awc-generator:username", user);

      return `[${
        information.media.title.romaji
      }](${animeURL})\nStart: ${formatFuzzyDate(
        information.startedAt
      )} Finish: ${formatFuzzyDate(information.completedAt)} // Ep: ${
        information.progress
      }/${information.media.episodes || "?"}`;
    }
  } catch (error) {
    return error.message;
  }

  return "Not found.";
};

export default getAnimeInformation;
