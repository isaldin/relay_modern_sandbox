import React from 'react'
import { QueryRenderer, graphql } from 'react-relay'
import environment from '../createRelayEnvironment'
import { withRouter, Link } from 'react-router-dom'
import CreatePostMutation from '../mutations/CreatePostMutation'

const CreatePageViewerQuery = graphql`
  query CreatePageViewerQuery {
    viewer {
      id
    }
  }
`;

class CreatePage extends React.Component {

  state = {
    description: '',
    title: '',
  }

  render () {
    return (
      <QueryRenderer 
        environment={environment}
        query={CreatePageViewerQuery}
        render={({error, props}) => {
          if (error) {
            return (
              <div>{error.message}</div>
            )
          } else if (props) {
            return (
              <div className='w-100 pa4 flex justify-center'>
                <div style={{ maxWidth: 400 }} className=''>
                  <input
                    className='w-100 pa3 mv2'
                    value={this.state.description}
                    placeholder='Description'
                    onChange={(e) => this.setState({description: e.target.value})}
                  />
                  <input
                    className='w-100 pa3 mv2'
                    value={this.state.title}
                    placeholder='Image Url'
                    onChange={(e) => this.setState({title: e.target.value})}
                  />
                  {this.state.description && this.state.title &&
                    <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={() => {this._handlePost(props.viewer.id); this.setState({description: '', title: ''});}}>Post</button>
                  }
                </div>
              </div>
            )
          }
          return (<div>loading</div>)
        }}
      />
    )
  }

  _handlePost = (viewerId) => {
    const {description, title} = this.state
    CreatePostMutation(description, title, viewerId, () => {});
  }

}

export default withRouter(CreatePage)