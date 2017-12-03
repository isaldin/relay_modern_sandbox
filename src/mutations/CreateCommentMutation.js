import {
  commitMutation,
  graphql,
} from 'react-relay';

import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input:$input) {
      viewer {
        id
      }
      post {
        id,
        author {
         id
        }
      }
    }
  }
`;

const CreateCommentMutation = (text, postId, authorId, callback) => {
  commitMutation(environment, {
    mutation,
    variables: {
      input: {
        isPublished: true,
        text,
        postId,
        authorId,
        clientMutationId: "",
      },
    },
    onError: err => console.error(err),
    onCompleted: () => { if (callback) callback(); },
  });
};

export default CreateCommentMutation;
