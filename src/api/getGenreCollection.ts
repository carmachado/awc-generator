import { gql } from "@apollo/client";
import api from "./client";
import { GenreCollection } from "./types";

interface GenreCollectionData {
  GenreCollection: GenreCollection;
}

const GET_GENRE_COLLECTION_LIST = gql`
  query {
    # Define which variables will be used in the query (id)
    GenreCollection
  }
`;

const getCharacter = async (): Promise<GenreCollection> => {
  const result = await api.query<GenreCollectionData>({
    query: GET_GENRE_COLLECTION_LIST,
  });

  return result.data.GenreCollection;
};

export default getCharacter;
