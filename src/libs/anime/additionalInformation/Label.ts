import { AIFunction, AIParams, getField } from "../animeTypes";

const Label: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `${field.field}: ${field.values[0]}`;
};

const UserFavorites: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return `${getField(
    field
  )}[${user}](https://anilist.co/user/${user}/favorites)`;
};

const UserAnimeList: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return `${getField(
    field
  )}[${user}](https://anilist.co/user/${user}/animelist)`;
};

const User: AIFunction = async ({ field }) => {
  const user = field.values[0];

  return `${getField(field)}[${user}](https://anilist.co/user/${user})`;
};

export default {
  Label,
  User,
  UserFavorites,
  UserAnimeList,
};
