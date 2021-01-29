import { ApolloQueryResult, gql } from "@apollo/client";
import api from "./client";
import { Media, MEDIA } from "./getMedia";

interface MediaData {
  Page: {
    pageInfo: {
      lastPage: number;
    };
    media: Media[];
  };
}

interface MediaVars {
  ids: number[];
  page?: number;
}

const GET_MEDIA = gql`
  query($ids: [Int], $page: Int) {
    Page(page: $page, perPage: 50) {
      pageInfo {
        lastPage
      }
      media(id_in: $ids, type: ANIME) {
        ${MEDIA}
      }
    }
  }
`;

const getMediaList = async ({ ids }: MediaVars): Promise<Media[]> => {
  const result = await api.query<MediaData, MediaVars>({
    query: GET_MEDIA,
    variables: { ids, page: 1 },
  });

  let medias = result.data.Page.media;

  const promises: Promise<ApolloQueryResult<MediaData>>[] = [];

  const { lastPage } = result.data.Page.pageInfo;

  for (let page = 2; page <= lastPage; page += 1) {
    promises.push(
      api.query<MediaData, MediaVars>({
        query: GET_MEDIA,
        variables: { ids, page },
      })
    );
  }

  if (lastPage >= 2) {
    console.log("a");
    const results = await Promise.all(promises);
    console.log("b");
    const pagesMedia = results
      .map((value) => value.data.Page.media)
      .reduce((prev, curr) => {
        return { ...prev, ...curr };
      });

    medias = [...medias, ...pagesMedia];
  }

  return medias;
};

export default getMediaList;
