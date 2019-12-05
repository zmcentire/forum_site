import React from 'react';
import styled from 'styled-components';
import {withPosts} from '../providers/PostDataProvider';

import Post from '../Components/Post';
import Comment from '../Components/Comment';
import BackButton from '../Components/BackButton'

const PostPageWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 0 auto;
`;
const CommentsWrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  right: 0;

`;

class PostPage extends React.Component {
  componentDidMount() {
    this.props.getCommentsForPost(this.props.match.params.postId);
  };

  render() {
    const displayComments = this.props.comments.map((comment) => {
      return <Comment key={comment._id} commentInfo={comment} />
    })
    return(
      <PostPageWrapper>
        <BackButton goBack={this.props.history.goBack}/>
          <Post type="postPage" postInfo={this.props.onePost} postId={this.props.match.params.postId}/>
        <CommentsWrapper>
          {displayComments}
        </CommentsWrapper>
      </PostPageWrapper>
    );
  };

};

export default withPosts(PostPage);
