import { AIFunction, AIParams } from "../animeTypes";

const Label: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `${field.field}: ${field.values[0]}`;
};

const UserFavorites: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  return `${field.field}: [${field.values[0]}](https://anilist.co/user/${field.values[0]}/favorites)`;
};

const UserAnimeList: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  return `${field.field}: [${field.values[0]}](https://anilist.co/user/${field.values[0]}/animelist)`;
};

const User: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `${field.field}: [${field.values[0]}](https://anilist.co/user/${field.values[0]})`;
};

export default {
  Label,
  User,
  UserFavorites,
  UserAnimeList,
};
