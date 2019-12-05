import React from 'react';
import axios from 'axios';
// const API_HOST =  "http://localhost:8000/";

const {Provider, Consumer} = React.createContext();

class PostDataProvider extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        allPosts: [],
        comments: [],
        posts: [],
        topics: [],
        onePost: {
          tags: [],   //This is here to prime state for the tags array. if its not there, the .join method will break on render before the data comes back from axios
        },
      };
  };
  handleVotes = (postId,newVoteCount) => {

    axios.put(`/posts/${postId}`, newVoteCount)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getCommentsForPost = (postId) => {
    axios.get(`/comments/${postId}`)
      .then((res) => {
        this.setState({
          comments: res.data.reverse()
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getRandomPosts = () => {
    axios.get(`/posts/`)
      .then((res) => {
        this.setState({
          allPosts: res.data
        });
      })
      .catch((err) => {
        console.error(err)
      });
  };
  getPostsForTopic = (id) => {        // we'll need to adjust this so it only pulls post for a single topic
    axios.get(`/posts/${id}`)
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch((err) => {
        console.error(err)
      });
  };
  getTopics = () => {
    axios.get(`/topics`)
      .then( res => {
        this.setState({topics: res.data})
      })
      .catch((err) => {
        console.error(err)
      });
  };
  getTopicOfPost = (topicId) => {
    return axios.get(`/topics/${topicId}`)
  }

  render() {
    return (
      <Provider value={{
        ...this.state,
        getRandomPosts: this.getRandomPosts,
        getCommentsForPost: this.getCommentsForPost,
        getPostsForTopic: this.getPostsForTopic,
        getTopics: this.getTopics,
        getOnePost: this.getOnePost,
        handleVotes: this.handleVotes,
        getTopicOfPost: this.getTopicOfPost,

      }}>
        {this.props.children}
      </Provider>
    );
  };
};

export default PostDataProvider;

export function withPosts(Comp) {
  return props =>
    <Consumer>
      {value => <Comp {...value}{...props} />}
    </Consumer>
};
