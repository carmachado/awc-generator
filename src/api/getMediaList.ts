import { gql } from "@apollo/client";
import api from "./client";
import { MEDIA } from "./getMedia";
import { MediaList } from "./types";

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
    ${MEDIA}
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
