import { gql } from "@apollo/client";
import api from "./client";
import { Media } from "./types";

interface MediaData {
  Media: Media;
}

interface MediaVars {
  id: number;
}

export const MEDIA = `
  id
  episodes
  season
  seasonYear
  title {
    romaji
    english
  }
  genres
`;

const GET_MEDIA = gql`
  query($id: Int) {
    Media(id: $id, type: ANIME) {
      ${MEDIA}
    }
  }
`;

const getMedia = async ({ id }: MediaVars): Promise<Media> => {
  const result = await api.query<MediaData, MediaVars>({
    query: GET_MEDIA,
    variables: { id },
  });

  return result.data.Media;
};

export default getMedia;
