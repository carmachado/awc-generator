export interface ThreadComment {
  user: {
    name: string;
  };
  thread: {
    title: string;
  };
}

export interface Staff {
  name: {
    full: string;
  };
}

export interface MediaTitle {
  romaji: string;
  english: string;
}

export interface Media {
  id: number;
  season: string;
  seasonYear: number;
  episodes: number | null;
  title: MediaTitle;
  genres: [string];
}

export const defaultMedia: Media = {
  id: 0,
  title: { romaji: "Anime_Title", english: "Anime_Title" },
  season: "season",
  seasonYear: 0,
  episodes: 0,
  genres: [""],
};

export interface MediaList {
  status?: string;
  progress?: number;
  startedAt?: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  completedAt?: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  media: Media;
}

export type GenreCollection = string[];

export interface Character {
  name: {
    full: string;
  };
}
