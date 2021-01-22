import { gql } from "@apollo/client";
import api from "./client";

export interface Character {
  name: {
    full: string;
  };
}

interface CharacterData {
  Character: Character;
}

interface CharacterVars {
  id: number;
}

const GET_CHARACTER_LIST = gql`
  query($id: Int) {
    Character(id: $id) {
      name {
        full
      }
    }
  }
`;

const getCharacter = async ({ id }: CharacterVars): Promise<Character> => {
  const result = await api.query<CharacterData, CharacterVars>({
    query: GET_CHARACTER_LIST,
    variables: { id },
  });

  return result.data.Character;
};

export default getCharacter;
