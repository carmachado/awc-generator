import { gql } from "@apollo/client";
import api from "./client";
import { Media } from "./getMedia";

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

interface MediaListData {
  MediaList: MediaList;
}

interface MediaListVars {
  id: number;
  userName: string;
}

export const MEDIA_LIST = `
  status
  progress
  startedAt {
    year
    month
    day
  }
  completedAt {
    year
    month
    day
  }
  media {
    id
    episodes
    season
    seasonYear
    title {
      romaji
      english
    }
  }
`;

const GET_MEDIA_LIST = gql`
  query($userName: String, $id: Int) {
    MediaList(userName: $userName, mediaId: $id, type: ANIME) {
      ${MEDIA_LIST}
    }
  }
`;

const getMediaList = async ({
  id,
  userName,
}: MediaListVars): Promise<MediaList> => {
  const result = await api.query<MediaListData, MediaListVars>({
    query: GET_MEDIA_LIST,
    variables: { id, userName },
  });

  return result.data.MediaList;
};

export default getMediaList;
