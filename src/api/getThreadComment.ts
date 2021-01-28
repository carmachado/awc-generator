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

export default getThreadComments;
