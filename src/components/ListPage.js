import React from 'react'
import Post from './Post'
import CreatePage from './CreatePage';
import { Link } from 'react-router-dom'
import {
  createRefetchContainer,
  graphql
} from 'react-relay'

class ListPage extends React.Component {

  handleDelete = () => this.props.relay.refetch({}, null);

  render () {
    return (
      <div className='fl w-100 flex justify-center flex-wrap'>
        <div className='fl w-100'>
          {this.props.viewer.allPosts.edges.filter(item => item.node !== undefined).reverse().map(({node}) =>
            <Post key={node.id} post={node} viewer={this.props.viewer} onDelete={this.handleDelete} />
          )}
        </div>
        <div className="fl w-100">
          <CreatePage/>
        </div>
      </div>
    )
  }
}

export default createRefetchContainer(ListPage, {
  viewer: graphql`
    fragment ListPage_viewer on Viewer {
        ...Post_viewer
        allPosts(last: 5) @connection(key: "ListPage_allPosts", filters: []) {
            edges {
                node {
                    id
                    description
                    title
                    ...Post_post
                }
            }
        }
    }
  `},
  graphql`
    query ListPage_RefetchQuery {
      viewer {
        ...ListPage_viewer
      }
    }
  `,
);