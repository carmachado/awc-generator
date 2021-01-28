import getCharacter from "../../../api/getCharacter";
import getMedia from "../../../api/getMedia";
import getStaff from "../../../api/getStaff";
import getThreadComments, {
  ThreadComment,
} from "../../../api/getThreadComment";
import {
  AIParams,
  getAnimeID,
  AIFunction,
  AdditionalInformationFields,
} from "../animeTypes";

const getField = ({
  field,
  occultField,
}: AdditionalInformationFields): string => {
  if (occultField) return "";
  return `${field}: `;
};

const getThreadCommentsURL = async (link: string): Promise<ThreadComment[]> => {
  const url = new URL(link);
  const threadId = Number.parseInt(url.pathname.split("/")[3], 10);
  const id = Number.parseInt(url.pathname.split("/")[5], 10);

  return getThreadComments({ id, threadId });
};

const Link: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `[${field.field}](${field.values[0]})`;
};

const Label: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `[${field.values[0]}](${field.values[1]})`;
};

const Staff: AIFunction = async ({ field }: AIParams): Promise<string> => {
  const id = getAnimeID(field.values[0]);
  const { name } = await getStaff({ id });
  return `${getField(field)}[${name.full}](https://anilist.co/staff/${id})`;
};

const Character: AIFunction = async ({ field }: AIParams): Promise<string> => {
  const id = getAnimeID(field.values[0]);
  const { name } = await getCharacter({ id });
  return `${getField(field)}[${name.full}](https://anilist.co/character/${id})`;
};

const Anime: AIFunction = async ({
  field,
  settings,
}: AIParams): Promise<string> => {
  const id = getAnimeID(field.values[0]);
  const { title } = await getMedia({ id });
  const { value: language } = settings.language;

  return `${getField(field)}[${
    title[language]
  }](https://anilist.co/anime/${id})`;
};

const CommentUser: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  const [
    {
      user: { name },
    },
  ] = await getThreadCommentsURL(field.values[0]);
  return `${getField(field)}[${name}](${field.values[0]})`;
};

const ChallengeUser: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  const [
    {
      user: { name },
    },
  ] = await getThreadCommentsURL(field.values[0]);
  return `${getField(field)}[${name}’s Challenge](${field.values[0]})`;
};

const CommentTitle: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  const [
    {
      thread: { title },
    },
  ] = await getThreadCommentsURL(field.values[0]);
  return `${getField(field)}[${title}](${field.values[0]})`;
};

export default {
  Link,
  Label,
  Staff,
  Anime,
  Character,
  ChallengeUser,
  CommentUser,
  CommentTitle,
};
