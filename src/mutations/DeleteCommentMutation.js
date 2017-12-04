import {
  commitMutation,
  graphql,
} from 'react-relay';
// import {ConnectionHandler} from 'relay-runtime'
import environment from '../createRelayEnvironment';

const mutation = graphql`
  mutation DeleteCommentMutation($input: DeleteCommentInput!) {
    deleteComment(input:$input) {
      comment {
        id
      }
      deletedId
    }
  }
`;

const DeleteCommentMutation = (commentId) => {
  commitMutation(
    environment,
    {
      mutation,
      variables: {
        input: {
          id: commentId,
          clientMutationId: '',
        },
      },
      onError: err => console.error(err),
      configs: [{
        type: 'NODE_DELETE',
        deletedIDFieldName: 'deletedId',
      }],
    }
  );
};

export default DeleteCommentMutation;
