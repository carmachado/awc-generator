import { ApolloQueryResult, gql } from "@apollo/client";
import api from "./client";
import { MEDIA_LIST, MediaList } from "./getMediaList";

interface MediaListData {
  Page: {
    pageInfo: {
      lastPage: number;
    };
    mediaList: [MediaList];
  };
}

interface MediaListVars {
  ids: number[];
  userName: string;
  page?: number;
}

const GET_MEDIA_LIST = gql`
  query($userName: String, $ids: [Int], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        lastPage
      }
      mediaList(userName: $userName, mediaId_in: $ids, type: ANIME) {
        ${MEDIA_LIST}
      }
    }
  }
`;

const getMediaList = async ({
  ids,
  userName,
}: MediaListVars): Promise<[MediaList]> => {
  const result = await api.query<MediaListData, MediaListVars>({
    query: GET_MEDIA_LIST,
    variables: { ids, userName, page: 1 },
  });

  let medias = result.data.Page.mediaList;

  let promises: [Promise<ApolloQueryResult<MediaListData>>];
  const { lastPage } = result.data.Page.pageInfo;

  for (let page = 2; page <= lastPage; page += 1) {
    promises.push(
      api.query<MediaListData, MediaListVars>({
        query: GET_MEDIA_LIST,
        variables: { ids, userName, page },
      })
    );
  }

  if (lastPage >= 2) {
    const results = await Promise.all(promises);
    const pagesMedia = results
      .map((value) => value.data.Page.mediaList)
      .reduce((prev, curr) => {
        return { ...prev, ...curr };
      });

    medias = { ...medias, ...pagesMedia };
  }
  return medias;
};

export default getMediaList;
