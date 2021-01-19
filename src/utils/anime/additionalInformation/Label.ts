import { AIFunction, AIParams } from "../animeDefinitions";

const Label: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `${field.field}: ${field.value}`;
};

const UserFavorites: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  return `${field.field}: [${field.value}](https://anilist.co/user/${field.value}/favorites)`;
};

export default {
  Label,
  UserFavorites,
};
