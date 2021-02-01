import getCharacter from "../../../api/getCharacter";
import getMedia from "../../../api/getMedia";
import getStaff from "../../../api/getStaff";
import { getThreadCommentsURL } from "../../../api/getThreadComment";
import { getAnimeID, AIFunction } from "../animeTypes";
import { formatReturn } from "./utils";

const Link: AIFunction = async ({ field }) => {
  return `[${field.field}](${field.values[0]})`;
};

const Label: AIFunction = async ({ field }) => {
  return formatReturn(
    field,
    { values: field.values },
    `[${field.values[0]}](${field.values[1]})`
  );
};

const Staff: AIFunction = async ({ field }) => {
  const id = getAnimeID(field.values[0]);
  const {
    name: { full: name },
  } = await getStaff({ id });

  return formatReturn(
    field,
    { name },
    `[${name}](https://anilist.co/staff/${id})`
  );
};

const Character: AIFunction = async ({ field }) => {
  const id = getAnimeID(field.values[0]);
  const {
    name: { full: name },
  } = await getCharacter({ id });

  return formatReturn(
    field,
    { name },
    `[${name}](https://anilist.co/character/${id})`
  );
};

const Anime: AIFunction = async ({ field, settings }) => {
  const id = getAnimeID(field.values[0]);
  const { title } = await getMedia({ id });
  const { value: language } = settings.language;
  const titleLanguage = title[language];

  return formatReturn(
    field,
    { title: titleLanguage },
    `[${titleLanguage}](https://anilist.co/anime/${id})`
  );
};

const CommentUser: AIFunction = async ({ field }) => {
  const {
    user: { name },
  } = await getThreadCommentsURL(field.values[0]);

  return formatReturn(field, { name }, `[${name}](${field.values[0]})`);
};

const ChallengeUser: AIFunction = async ({ field }) => {
  const {
    user: { name },
  } = await getThreadCommentsURL(field.values[0]);

  return formatReturn(
    field,
    { name },
    `[${name}’s ${field.field}](${field.values[0]})`
  );
};

const CommentTitle: AIFunction = async ({ field }) => {
  const {
    thread: { title },
  } = await getThreadCommentsURL(field.values[0]);

  const formattedTitle = title.replace("AWC: ", "");

  return formatReturn(
    field,
    { title },
    `[${formattedTitle}](${field.values[0]})`
  );
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
