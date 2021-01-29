/* eslint-disable no-param-reassign */
import getGenreCollection from "../../../api/getGenreCollection";
import { SettingsProps } from "../../settings/settingsType";
import { RunFunction, RunParams } from "./runTypes";

interface GenreCheck {
  genre: string;
  count: number;
  anime?: Media;
}

interface Media {
  id: number;
  linkID: number;
  status: string;
  media: string;
  genre: GenreCheck[];
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

  const removedHentai = genreCollection.filter((genre) => genre !== "Hentai");

  const genreList: GenreCheck[] = removedHentai.map((value) => {
    return { genre: value, count: 0 };
  });

  let medias: Media[] = mediaLists.map((ml) => {
    return {
      id: ml.reqId,
      linkID: ml.media.id,
      status: ml.status,
      media: ml.media.title[settings.language.value],
      genre: ml.media.genres.map((value) =>
        genreList.find(({ genre }) => genre === value)
      ),
    };
  });

  medias.forEach((media) => {
    media.genre.forEach((genre) => {
      genre.count += 1;
    });
    media.genre = media.genre.sort((a, b) => a.count - b.count);
  });

  const sortedGenres = genreList.sort((a, b) => a.count - b.count);

  let result = `<hr>\n\n#__Genre Checklist__\n`;

  sortedGenres.forEach((genre) => {
    const anime = medias.find((media) =>
      media.genre.find((gen) => genre.genre === gen.genre)
    );

    if (anime) {
      genre.anime = anime;
      medias = medias.filter((media) => media.media !== anime.media);
    }
  });

  const deSortedGenre = sortedGenres.sort((a, b) =>
    a.genre.localeCompare(b.genre)
  );

  deSortedGenre.forEach(({ anime, genre }) => {
    if (anime) {
      const emoji = getEmoji(settings, anime.status);
      result += `\n[${emoji}] ${genre}: #${anime.id < 10 ? "0" : ""}${
        anime.id
      }\n${getAnimeTitle(settings, anime.media, anime.linkID)}\n`;
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
