import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import AppBarButton from "react-uwp/AppBarButton";
import Button from "react-uwp/Button";
import ContentDialog from "react-uwp/ContentDialog";


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "first_name": "",
      "last_name": "",
      "email": "",
      "create_date": "",
      "bio": "",
      "seenList": [],
      "bucketList": [],
      "recommendList": [],
      "postList": [],

      "showDeleteDialog": false
    };

    this.getData = this.getData.bind(this);
    this.getSeenData = this.getSeenData.bind(this);
    this.getBucketData = this.getBucketData.bind(this);
    this.getRecommendData = this.getRecommendData.bind(this);
    this.getPostList = this.getPostList.bind(this);
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }
  
  refreshToken() {
    const refreshOptions = {
      'method': 'POST',
      'url': "https://minerva.metamehta.me/auth/refreshToken",
      'headers': {
        'Authorization': localStorage.getItem("refresh_token")
      }
    }
    
    const refreshAuthLogic = failedRequest => axios(refreshOptions)
      .then(tokenRefreshResponse => {
        localStorage.setItem('access_token', tokenRefreshResponse.data.access_token);
        localStorage.setItem('refresh_token', tokenRefreshResponse.data.refresh_token);
        failedRequest.response.config.headers['Authorization'] = tokenRefreshResponse.data.access_token;
      return Promise.resolve();
    });

    return refreshAuthLogic;
  }


  getData() {
    let username = localStorage.getItem("username");
    let url = 'https://vidura.rashil2000.me/user/' + username;
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
      .then(response => {
        //console.log(response.data);
        this.setState({
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          bio: response.data.bio,
          create_date: response.data.create_date
        })
      })
      .catch(error => { console.log(error) })
  }

  getSeenData() {
    let username = localStorage.getItem("username");
    let url = 'https://vidura.rashil2000.me/user/' + username + '/getSeenList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }))
        arr.pop();
        this.setState({
          seenList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  getBucketData() {
    let username = localStorage.getItem("username");
    let url = 'https://vidura.rashil2000.me/user/' + username + '/getBucketList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }));
        arr.pop();
        this.setState({
          bucketList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  getRecommendData() {
    let username = localStorage.getItem("username");
    let url = 'https://vidura.rashil2000.me/user/' + username + '/getRecommendList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }));
        arr.pop();
        this.setState({
          recommendList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  getPostList() {
    let username = localStorage.getItem("username");
    let url = 'https://vidura.rashil2000.me/user/' + username + '/posts';
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          postList: response.data
        })
      })
      .catch(error => { console.log(error) })
  }

  handleDeleteDialog() { this.setState({ showDeleteDialog: false }) }

  handleDeletePost(id) {
    let url = 'https://vidura.rashil2000.me/post/' + id + '/delete';
    const axiosOptions = {
      'method': 'DELETE',
      'url': url,
      headers: {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
      .then(response => {
        console.log(response.data);
        window.location.pathname = `/profile`;
      })
      .catch(error => { console.log(error) })
  }

  handleLogOut() {
    const axiosOptions = {
      'method': 'POST',
      'url': 'https://vidura.rashil2000.me/auth/logout',
      headers: {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    const refreshAuthLogic = this.refreshToken();

    createAuthRefreshInterceptor(axios, refreshAuthLogic);

    axios(axiosOptions)
      .then(response => {
        //console.log(response.data);
        localStorage.removeItem("username");
        localStorage.removeItem("userID");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.clear();
        window.location.pathname = "/";
      })
      .catch(error => console.log(error))
  }

  componentDidMount() {
    this.getData();
    this.getSeenData();
    this.getBucketData();
    this.getRecommendData();
    this.getPostList();
  }

  componentWillReceiveProps() {
    document.title = `Profile - ${this.state.username} - DYSTuss`;
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, cursor: "pointer" };
    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
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

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>Profile</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <AppBarButton
              style={buttonStyle}
              icon={<span className="sdl2asset">&#xF3B1;</span>}
              label="Sign Out"
              labelPosition="right"
              onClick={this.handleLogOut}
            />
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root}>
          <div className="profile-details">
            <div {...classes.acrylic60}>
              <div style={{ fontSize: 24 }}>Dashboard</div>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xE73A;</span>&nbsp; Stuff already seen: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.seenList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>
                  <p style={{ float: "left" }}>{item.movie.movie}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset" style={{ cursor: "pointer" }}>&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xECDE;</span>&nbsp; Stuff to be seen: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.bucketList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>
                  <p style={{ float: "left" }}>{item.movie.movie}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset" style={{ cursor: "pointer" }}>&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xE3B8;</span>&nbsp; Recommendations: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.recommendList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>{item.movie.movie}</li>))}
              </ul>
            </div>
          </div>
          <div className="profile-meta">
            <div {...classes.acrylic80}>
              <div className="sdl2asset" style={{ fontSize: 50 }}>&#xEBF7;</div>
              <br />
              <p style={{ fontSize: 18 }}>{this.state.username}</p>
              <br />
              <p style={{ fontSize: 16 }}>{this.state.bio}</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE8F3;</span>&nbsp; {this.state.postList.length} Posts</p>
              <br />
              <p><span className="sdl2asset">&#xE9D5;</span>&nbsp; {this.state.seenList.length} Seen Items</p>
              <br />
              <p><span className="sdl2asset">&#xE8FD;</span>&nbsp; {this.state.bucketList.length} Bucket Items</p>
              <br />
              <p><span className="sdl2asset">&#xEF74;</span>&nbsp; {this.state.recommendList.length} Recommendations</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE787;</span>&nbsp; Joined {this.state.create_date}</p>
            </div>
          </div>
        </div>
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "40px" }}>
          <p style={{ fontSize: 30, float: "left" }}>Posts</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <Link to="/">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE428;</span>}
                label="Feed"
                labelPosition="right"
              />
            </Link>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root}>
          {this.state.postList.map(post => {
            return (
              <div className="postlist-item" key={post.id}>
                <div {...classes.acrylic60}>
                  <Link to={'/post/' + post.id}><div className="postlist-title">{post.title}</div></Link>
                  <div className="postlist-details">
                    <div style={{ float: "left" }}>
                      <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; {post.numComments} </div>
                      <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; {post.upvotes - post.downvotes}</div>
                    </div>
                    <div style={{ float: "right" }}>
                      <Button
                        style={{ margin: "0px", padding: "5px 5px 4px 0px", ...buttonStyle }}
                        icon={<span className="sdl2asset">&#xE74D;&nbsp;</span>}
                        onClick={() => { this.setState({ showDeleteDialog: true }) }}
                      >
                        Delete
                      </Button>
                      <ContentDialog
                        style={buttonStyle}
                        title="Confirm"
                        content="This action cannot be undone. Are you sure?"
                        defaultShow={this.state.showDeleteDialog}
                        primaryButtonAction={() => { this.handleDeletePost(post.id) }}
                        onCloseDialog={() => { this.setState({ showDeleteDialog: false }) }}
                      />
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}