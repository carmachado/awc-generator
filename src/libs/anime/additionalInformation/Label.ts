import { AIFunction, AIParams } from "../animeTypes";
import { formatReturn } from "./utils";

const Label: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return formatReturn(field, { value: field.values[0] }, `${field.values[0]}`);
};

const UserFavorites: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return formatReturn(
    field,
    { user },
    `[${user}](https://anilist.co/user/${user}/favorites)`
  );
};

const UserAnimeList: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return formatReturn(
    field,
    { user },
    `[${user}](https://anilist.co/user/${user}/animelist)`
  );
};

const User: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return formatReturn(
    field,
    { user },
    `[${user}](https://anilist.co/user/${user})`
  );
};

export default {
  Label,
  User,
  UserFavorites,
  UserAnimeList,
};
