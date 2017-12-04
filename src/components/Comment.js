import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

import DeleteCommentMutation from '../mutations/DeleteCommentMutation';

const Comment = ({comment}) => {
  return (
    <div>
      <p>{comment.text}&nbsp;
        <span
          onClick={() => DeleteCommentMutation(comment.id)}
          style={{color: 'red', cursor: 'pointer',}}>
          [-]
        </span>
      </p>
    </div>
  );
};

const CommentFragmentContainer = createFragmentContainer(Comment, graphql`
  fragment Comment_comment on Comment {
    id,
    isPublished,
    text,
    post {
      id
    }
  }
`);

export default CommentFragmentContainer;
