import React from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay';
import DeletePostMutation from '../mutations/DeletePostMutation';
import { withRouter } from 'react-router-dom';

class Post extends React.Component {

  render () {
    return (
      <div className='fl w-20 bg-black-05 pa1 br'>
        <div className='pt3'>
          {this.props.post.title}&nbsp;
          {this.props.post.description}&nbsp;
          <span
            className='red f6 pointer dim' 
            onClick={this._handleDelete}
          >Delete</span>
        </div>
      </div>
    )
  }

  _handleDelete = () => {
    DeletePostMutation(this.props.post.id, this.props.viewer.id, () => this.props.onDelete());
  }
}

const FragmentContainer =  createFragmentContainer(Post, graphql`
  fragment Post_viewer on Viewer {
    id
  }
  fragment Post_post on Post {
    id
    description
    title
    author {
      id
    }
  }
`)

export default withRouter(FragmentContainer);