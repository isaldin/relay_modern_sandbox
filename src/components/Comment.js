import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';

const Comment = ({comment}) => {
  return <p>{comment.text}</p>;
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
