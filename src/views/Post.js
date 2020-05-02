import * as React from "react";
import * as PropTypes from "prop-types";
import axios from 'axios';

import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import MarkdownRender from "react-uwp/MarkdownRender";

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post_id: '',
      title: '',
      author: '',
      author_id: '',
      body: '',
      post_movie: '',
      appeal: '',
      last_edit_time: '',
      commentCount: '',
      comments: [],
      createCommentBody: '',
      errMessage: ''
    };

    this.getData = this.getData.bind(this);
    this.getComments = this.getComments.bind(this);
    this.handlePostUpvote = this.handlePostUpvote.bind(this);
    this.handlePostDownvote = this.handlePostUpvote.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleCommentUpvote = this.handleCommentUpvote.bind(this);
    this.handleCommentDownvote = this.handleCommentDownvote.bind(this);
  }

  getData() {
    let post_id = window.location.pathname.split("/")[2];
    let url = 'http://minerva.rashil2000.me/post/' + post_id;
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          post_id: response.data.id,
          title: response.data.title,
          author: response.data.author,
          author_id: response.data.author_id,
          body: response.data.body,
          post_movie: response.data.post_movie,
          appeal: response.data.upvotes - response.data.downvotes,
          last_edit_time: response.data.last_edit_time,
          commentCount: response.data.numComments
        })
      })
      .catch(error => { console.log(error) })
  }

  getComments() {
    let post_id = window.location.pathname.split("/")[2];
    let url = 'http://minerva.rashil2000.me/post/' + post_id + '/comments';
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          comments: response.data
        })
      })
      .catch(error => { console.log(error) })
  }

  handlePostUpvote(){
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://minerva.rashil2000.me/post/' + post_id + '/upvote',
      'headers' : {
        'Authorization' : localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
    .then(response => {
      this.setState({
        appeal : this.state.appeal + 1 
      });

    })
    .catch(error => {
      this.setState({
        errMessage : "You've already reacted to this post. "
      });
      console.log(error.response)
    })

  }

  handlePostDownvote(){
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://minerva.metamehta.me/post' + post_id + '/downvote',
      'headers' : {
        'Authorization' : localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
    .then(response => {
      this.setState({
        appeal : this.state.appeal - 1   
      });

    })
    .catch(error => {
      this.setState({
        errMessage : "You've already reacted to this post. "
      });
    })

  }

  handleCreateComment(){
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://minerva.metamehta.me/comment/create/' + post_id,
      'headers' : {
        'Authorization' : localStorage.getItem("access_token")
      },
      'data' : {
        'body' : this.state.createCommentBody
      }
    }
    console.log(axiosOptions);

    axios(axiosOptions)
    .then(response => {
      console.log(response);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
      console.log(error.response);
    })

  }

  handleCommentUpvote(value){
    console.log(value);
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://minerva.metamehta.me/post' + value + '/downvote',
      'headers' : {
        'Authorization' : localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
    .then(response => {
      this.setState({
        appeal : this.state.appeal - 1   
      });

    })
    .catch(error => {
      this.setState({
        errMessage : "You've already reacted to this post. "
      });
    })

  }

  handleCommentDownvote(value){
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://minerva.metamehta.me/comment' + value + '/downvote',
      'headers' : {
        'Authorization' : localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
    .then(response => {
      this.setState({
        appeal : this.state.appeal - 1   
      });

    })
    .catch(error => {
      this.setState({
        errMessage : "You've already reacted to this post. "
      });
    })

  }

  componentDidMount() {
    this.setState({ imdb_id: window.location.pathname.split("/")[2] })
    this.getData();
    this.getComments();
  }

  componentWillReceiveProps(){
    document.title = `${this.state.title} - DYSTuss`;
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "right",
        justifyContent: "right",
        flexWrap: "wrap",
        background: theme.desktopBackground
      }),
      acrylic20: { ...itemStyle, ...theme.acrylicTexture20.style },
      acrylic40: { ...itemStyle, ...theme.acrylicTexture40.style },
      acrylic60: { ...itemStyle, ...theme.acrylicTexture60.style },
      acrylic80: { ...itemStyle, ...theme.acrylicTexture80.style },
      acrylic100: { ...itemStyle, ...theme.acrylicTexture100.style }
    };
    const classes = theme.prepareStyles({ styles });

    // const clickComment = () => {
    //   // TODO: Add function to post comment
    // }

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>{this.state.title}</p>
          <p style={{ fontSize: 15, float: "right" }}><span className="sdl2asset">&#xEFD3;</span>&nbsp; {this.state.author}</p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.acrylic60} style={{ fontSize: "18px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          <MarkdownRender text={this.state.body} />
        </div>
        <div {...classes.acrylic80} style={{ fontSize: 16, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ float: "left", paddingTop: "15px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; {this.state.commentCount} &nbsp;&nbsp;<span className="sdl2asset">&#xE3AF;</span>&nbsp; {this.state.appeal}</p>
          <p style={{ float: "right" }}>
            <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E1;</span>} onClick={this.handlePostUpvote} />
            <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E0;</span>} onClick={this.handlePostDownvote}/>
            <p>{this.state.errMessage}</p>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root} id="commentbox">
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
            <p style={{ fontSize: 16 }}>Comment what you feel: </p>
            <TextBox
              style={{ margin: "10px auto", width: "100%" }}
              background="none"
              placeholder="Click on the icon when done..."
              onChange={e => this.setState({ createCommentBody: e.target.value })}
              rightNode={<span className="sdl2asset" onClick={this.handleCreateComment}>&#xF2B3;&nbsp;&nbsp;</span>}
            />
          </div>
        </div>
        <div {...classes.root}>
          {this.state.comments.map(comment =>
            <div key={comment.id} {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
              <p style={{fontSize: 15}}>{comment.author_username}</p>
              <p>{comment.body}</p>
              <p style={{ float: "left", paddingTop: "15px" }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; {comment.upvotes - comment.downvotes}</p>
              <p style={{ float: "right" }}>
                <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E1;</span>} />
                <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E0;</span>} />
              </p>
              <div style={{ clear: "both" }}></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}