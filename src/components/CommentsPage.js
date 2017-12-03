import React, {Component} from 'react';

import Comment from './Comment';
import CreateCommentMutation from '../mutations/CreateCommentMutation';

class CommentsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handlePostComment = () => {
    const {text} = this.state;
    const {post: {id: postId, author: {id: authorId}}} = this.props;
    CreateCommentMutation(text, postId, authorId);
    this.setState({text: ''});
  };

  render() {
    const {post, comments} = this.props;

    if (!post) return <div>Loading...</div>;

    const {id: postId} = post;
    return (
      <div className="comments-page">
        <div className='w-80 fl justify-center'>
          <div style={{ maxWidth: 400 }} className=''>
            <input
              className='w-100 pa3 mv2'
              value={this.state.text}
              placeholder='Description'
              onChange={(e) => this.setState({text: e.target.value})}
            />
            <button
              disabled={!this.state.text || this.state.text === ''}
              className='pa3 bg-black-10 bn dim ttu pointer'
              onClick={this.handlePostComment}
            >
              Post comment
            </button>
          </div>
        </div>
        {comments && (
          <div>
            <span>Comments {postId}({comments.edges.length})</span>
            <div className="comments fl w-100">
              {comments.edges.map(edge => (
                <div key={edge.node.id}>
                  <Comment key={edge.node.id} comment={edge.node} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default CommentsPage;
