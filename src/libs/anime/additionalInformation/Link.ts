import getCharacter from "../../../api/getCharacter";
import getMedia from "../../../api/getMedia";
import getStaff from "../../../api/getStaff";
import { getThreadCommentsURL } from "../../../api/getThreadComment";
import { getAnimeID, AIFunction, getField } from "../animeTypes";

const Link: AIFunction = async ({ field }) => {
  return `[${field.field}](${field.values[0]})`;
};

const Label: AIFunction = async ({ field }) => {
  return `${getField(field)}[${field.values[0]}](${field.values[1]})`;
};

const Staff: AIFunction = async ({ field }) => {
  const id = getAnimeID(field.values[0]);
  const { name } = await getStaff({ id });
  return `${getField(field)}[${name.full}](https://anilist.co/staff/${id})`;
};

const Character: AIFunction = async ({ field }) => {
  const id = getAnimeID(field.values[0]);
  const { name } = await getCharacter({ id });
  return `${getField(field)}[${name.full}](https://anilist.co/character/${id})`;
};

const Anime: AIFunction = async ({ field, settings }) => {
  const id = getAnimeID(field.values[0]);
  const { title } = await getMedia({ id });
  const { value: language } = settings.language;
  const titleLanguage = title[language];

  return `${getField(field)}[${titleLanguage}](https://anilist.co/anime/${id})`;
};

const CommentUser: AIFunction = async ({ field }) => {
  const {
    user: { name },
  } = await getThreadCommentsURL(field.values[0]);

  return `${getField(field)}[${name}](${field.values[0]})`;
};

const ChallengeUser: AIFunction = async ({ field }) => {
  const {
    user: { name },
  } = await getThreadCommentsURL(field.values[0]);

  return `${getField(field)}[${name}’s Challenge](${field.values[0]})`;
};

const CommentTitle: AIFunction = async ({ field }) => {
  const {
    thread: { title },
  } = await getThreadCommentsURL(field.values[0]);

  const formattedTitle = title.replace("AWC: ", "");

  return `${getField(field)}[${formattedTitle}](${field.values[0]})`;
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
