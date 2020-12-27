import * as React from "react";
import * as PropTypes from "prop-types";
import axios from 'axios';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import MarkdownRender from "react-uwp/MarkdownRender";
import * as actionCreators from '../store/actions/actionCreators';

class Post extends React.Component {

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
      errMessage: '',

      metaTitle: '',
      metaActorsList: [],
      metaGenreList: [],
      metaDirectorList: [],
      metaYear: '',
      metaPoster_url: ''
    };

    this.getData = this.getData.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
    this.handlePostUpvote = this.handlePostUpvote.bind(this);
    this.handlePostDownvote = this.handlePostUpvote.bind(this);
    this.handleCreateComment = this.handleCreateComment.bind(this);
    this.handleCommentUpvote = this.handleCommentUpvote.bind(this);
    this.handleCommentDownvote = this.handleCommentDownvote.bind(this);
  }

  getData() {
    let post_id = window.location.pathname.split("/")[2];
    let url = `${process.env.REACT_APP_DB_HOST}/post/` + post_id;
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          post_id: response.data.id,
          title: response.data.title,
          author: response.data.author_username,
          author_id: response.data.author_id,
          body: response.data.body,
          post_movie: response.data.post_movie,
          appeal: response.data.upvotes - response.data.downvotes,
          last_edit_time: response.data.last_edit_time,
          commentCount: response.data.numComments
        })
      })
      .catch(error => {
        //console.log(error);
        window.location.pathname = "/error404";
      })
  }

  getComments() {
    let post_id = window.location.pathname.split("/")[2];
    let url = `${process.env.REACT_APP_DB_HOST}/post/` + post_id + '/comments';
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
      .catch(error => { /* console.log(error) */ })
  }

  getMetaData() {
    let url = `${process.env.REACT_APP_DB_HOST}/movie/` + this.state.post_movie;
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          metaTitle: response.data.title,
          metaActorsList: response.data.actors.actorsList,
          metaGenreList: response.data.genre.genreList,
          metaDirectorList: response.data.director.directorList,
          metaYear: response.data.year,
          metaPoster_url: response.data.poster_url,
        })
      })
      .catch(error => { /* console.log(error) */ })
  }

  handlePostUpvote() {
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/post/` + post_id + '/upvote',
      'headers': {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    this.props.registerRefreshToken();

    axios(axiosOptions)
      .then(response => {
        this.setState({
          appeal: this.state.appeal + 1
        });

      })
      .catch(error => {
        this.setState({
          errMessage: "You've already reacted to this post. "
        });
        //console.log(error.response)
      })

  }

  handlePostDownvote() {
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/post` + post_id + '/downvote',
      'headers': {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    this.props.registerRefreshToken();

    axios(axiosOptions)
      .then(response => {
        this.setState({
          appeal: this.state.appeal - 1
        });

      })
      .catch(error => {
        this.setState({
          errMessage: "You've already reacted to this post. "
        });
      })

  }

  handleCreateComment() {
    let post_id = window.location.pathname.split("/")[2];
    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/comment/create/` + post_id,
      'headers': {
        'Authorization': localStorage.getItem("access_token")
      },
      'data': {
        'body': this.state.createCommentBody
      }
    }

    this.props.registerRefreshToken();


    axios(axiosOptions)
      .then(response => {
        //console.log(response);
        //console.log(response.data);
      })
      .catch(error => {
        //console.log(error);
        //console.log(error.response);
      })

  }

  handleCommentUpvote(value) {
    //console.log(value);
    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/post` + value + '/downvote',
      'headers': {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    this.props.registerRefreshToken();

    axios(axiosOptions)
      .then(response => {
        this.setState({
          appeal: this.state.appeal - 1
        });

      })
      .catch(error => {
        this.setState({
          errMessage: "You've already reacted to this post. "
        });
      })

  }

  handleCommentDownvote(value) {
    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/comment` + value + '/downvote',
      'headers': {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    this.props.registerRefreshToken();

    axios(axiosOptions)
      .then(response => {
        this.setState({
          appeal: this.state.appeal - 1
        });

      })
      .catch(error => {
        this.setState({
          errMessage: "You've already reacted to this post. "
        });
      })

  }

  componentDidMount() {
    this.setState({ imdb_id: window.location.pathname.split("/")[2] })
    this.getData();
    this.getComments();
  }

  componentDidUpdate() {
    document.title = `${this.state.title} - DYSTuss`;
    this.getMetaData();
  }

  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;

    const buttonStyle = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, cursor: "pointer" };
    const itemStyle = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row",
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

    const doesMetaExistClass = this.state.post_movie.length ? "profile-details" : "";
    const doesMetaExistMargin = this.state.post_movie.length ? "0px" : "20px";

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginBottom: doesMetaExistMargin }}>
          <p style={{ fontSize: 30, float: "left" }}>{this.state.title}</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <Link to={`/movie/${this.state.post_movie}`}>
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE946;</span>}
                label="Meta Page"
                labelPosition="right"
              />
            </Link>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root}>
          <div className={doesMetaExistClass}>
            <div {...classes.acrylic60} style={{ fontSize: "18px", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
              <MarkdownRender text={this.state.body} />
            </div>
            <div {...classes.acrylic80} style={{ fontSize: 16, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
              <p style={{ float: "left", paddingTop: "15px" }}><span className="sdl2asset">&#xEFD3;</span>&nbsp; {this.state.author} &nbsp;&nbsp;<span className="sdl2asset">&#xF70F;</span>&nbsp; {this.state.commentCount} &nbsp;&nbsp;<span className="sdl2asset">&#xE3AF;</span>&nbsp; {this.state.appeal}</p>
              <p style={{ float: "right" }}>
                <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E1;</span>} onClick={this.handlePostUpvote} />
                <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E0;</span>} onClick={this.handlePostDownvote} />
                <p>{this.state.errMessage}</p>
              </p>
              <div style={{ clear: "both" }}></div>
            </div>
          </div>
          {this.state.post_movie.length
            ?
            <div className="profile-meta">
              <div {...classes.acrylic80} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                <img src={this.state.metaPoster_url} alt="poster" style={{ padding: "20px" }}></img>
                <br />
                <p style={{ fontSize: 18 }}>{this.state.metaTitle} ({this.state.metaYear})</p>
                <br /><hr /><br />
                <p>Genre(s): &gt;{this.state.metaGenreList.join(' >')}</p>
                <br /><hr /><br />
                <p>Director(s): {this.state.metaDirectorList.join(', ')}</p>
                <br />
                <p>Actor(s): {this.state.metaActorsList.join(', ')}</p>
                <br />
              </div>
            </div>
            :
            <span></span>
          }
        </div>
        <div {...classes.root} id="commentbox">
          <div {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px", width: "100%" }}>
            <p style={{ fontSize: 16 }}>Comment what you feel: </p>
            <TextBox
              style={{ margin: "10px auto", width: "100%" }}
              background="none"
              placeholder="Click on the icon when done..."
              onChange={e => this.setState({ createCommentBody: e.target.value })}
              rightNode={<span className="sdl2asset" style={{ cursor: "pointer" }} onClick={this.handleCreateComment}>&#xF2B3;&nbsp;&nbsp;</span>}
            />
          </div>
        </div>
        <div {...classes.root}>
          {this.state.comments.map(comment =>
            <div key={comment.id} {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
              <p style={{ fontSize: 15 }}>{comment.author_username}</p>
              <br />
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

const mapStateToProps = null/*state => {
  return {

  }
}*/

const mapDispatchToProps = dispatch => {
  return {
    registerRefreshToken: (axiosInstance) => dispatch(actionCreators.registerRefreshToken(axiosInstance))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
