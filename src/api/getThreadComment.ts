import { gql } from "@apollo/client";
import api from "./client";

export interface ThreadComment {
  user: {
    name: string;
  };
  thread: {
    title: string;
  };
}

interface ThreadCommentData {
  ThreadComment: ThreadComment[];
}

interface ThreadCommentVars {
  id: number;
  threadId: number;
}

const GET_COMMENT_LIST = gql`
  query($id: Int, $threadId: Int) {
    ThreadComment(id: $id, threadId: $threadId) {
      user {
        name
      }
      thread {
        title
      }
    }
  }
`;

const getThreadComments = async ({
  id,
  threadId,
}: ThreadCommentVars): Promise<ThreadComment[]> => {
  const result = await api.query<ThreadCommentData, ThreadCommentVars>({
    query: GET_COMMENT_LIST,
    variables: { id, threadId },
  });

  return result.data.ThreadComment;
};

export const getThreadCommentsURL = async (
  link: string
): Promise<ThreadComment> => {
  const url = new URL(link);
  const threadId = Number.parseInt(url.pathname.split("/")[3], 10);
  const id = Number.parseInt(url.pathname.split("/")[5], 10);

  const [first] = await getThreadComments({ id, threadId });

  return first;
};

export default getThreadComments;
