import { gql } from "@apollo/client";
import api from "./client";
import { Media } from "./getMedia";

export interface MediaList {
  status: string;
  progress: number;
  startedAt: {
    year: number | null;
    month: number | null;
    day: number | null;
  };
  completedAt: {
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

const GET_MEDIA_LIST = gql`
  query($userName: String, $id: Int) {
    # Define which variables will be used in the query (id)
    MediaList(userName: $userName, mediaId: $id, type: ANIME) {
      # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
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
        }
      }
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
