import getMedia from "../../../api/getMedia";
import getStaff from "../../../api/getStaff";
import getThreadComments from "../../../api/getThreadComment";
import { AIParams, getAnimeID, AIFunction } from "../animeDefinitions";

const Link: AIFunction = async ({ field }: AIParams): Promise<string> => {
  return `[${field.field}](${field.value})`;
};

const Staff: AIFunction = async ({ field }: AIParams): Promise<string> => {
  const id = getAnimeID(field.value);
  const { name } = await getStaff({ id });
  return `${field.field}: [${name.full}](${field.value})`;
};

const Anime: AIFunction = async ({ field }: AIParams): Promise<string> => {
  const id = getAnimeID(field.value);
  const { title } = await getMedia({ id });
  return `${field.field}: [${title.romaji}](${field.value})`;
};

const CommentUser: AIFunction = async ({
  field,
}: AIParams): Promise<string> => {
  const url = new URL(field.value);

  const thread = Number.parseInt(url.pathname.split("/")[3], 10);
  const comment = Number.parseInt(url.pathname.split("/")[5], 10);
  const [
    {
      user: { name },
    },
  ] = await getThreadComments({
    id: comment,
    threadId: thread,
  });
  return `${field.field}: [${name}](${field.value})`;
};

export default {
  Link,
  Staff,
  Anime,
  CommentUser,
};
