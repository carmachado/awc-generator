/* eslint-disable no-param-reassign */
import getGenreCollection from "../../../api/getGenreCollection";
import { SettingsProps } from "../../settings/settingsType";
import { MediaListReq, RunFunction, RunParams } from "./runTypes";

interface GenreCheck {
  genre: string;
  count: number;
  anime?: MediaGenre;
}

interface MediaGenre extends MediaListReq {
  genres: GenreCheck[];
}

const getEmoji = (settings: SettingsProps, status: string): string => {
  if (status === "COMPLETED") return settings.completed;
  if (status === "CURRENT" && settings.watching) return settings.watching;
  return settings.notCompleted;
};

const getAnimeTitle = (
  settings: SettingsProps,
  title: string,
  id: string | number
): string => {
  if (settings.previewCards) {
    return `https://anilist.co/anime/${id}/`;
  }
  return `[${title}](https://anilist.co/anime/${id}/)`;
};

const GenreCheckList: RunFunction = async ({
  mediaLists,
  settings,
}: RunParams) => {
  const genreCollection = await getGenreCollection();

  const genresNotHentai = genreCollection.filter((genre) => genre !== "Hentai");

  const genreList: GenreCheck[] = genresNotHentai.map((value) => {
    return { genre: value, count: 0 };
  });

  let medias: MediaGenre[] = mediaLists.map((ml) => {
    return {
      ...ml,
      genres: ml.media.genres.map((value) =>
        genreList.find(({ genre }) => genre === value)
      ),
    };
  });

  medias.forEach((media) => {
    media.genres.forEach((genre) => {
      genre.count += 1;
    });
    media.genres = media.genres.sort((a, b) => a.count - b.count);
  });

  const sortedGenres = genreList.sort((a, b) => a.count - b.count);

  let result = `<hr>\n\n#__Genre Checklist__\n`;

  sortedGenres.forEach((genre) => {
    const anime = medias.find((media) =>
      media.genres.find((gen) => genre.genre === gen.genre)
    );

    if (anime) {
      genre.anime = anime;
      medias = medias.filter((media) => media.media !== anime.media);
    }
  });

  const resortedGenre = sortedGenres.sort((a, b) =>
    a.genre.localeCompare(b.genre)
  );

  resortedGenre.forEach(({ anime, genre }) => {
    if (anime) {
      const emoji = getEmoji(settings, anime.status);
      result += `\n[${emoji}] ${genre}: #${anime.reqId < 10 ? "0" : ""}${
        anime.reqId
      }\n${getAnimeTitle(
        settings,
        anime.media.title[settings.language.value],
        anime.media.id
      )}\n`;
    } else {
      result += `\n[O] ${genre}: #00\n${getAnimeTitle(
        settings,
        "Anime_Title",
        "00000"
      )}\n`;
    }
  });

  return result;
};

export default GenreCheckList;
