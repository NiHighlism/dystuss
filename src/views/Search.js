import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import axios from "axios";

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postSearchQuery: '',
      postSearchResults: [],
      movieSearchQuery: '',
      movieSearchResults: [],

      errMessagePost: '',
      errHrefPost: '',
      errMessageMovie: '',
      errHrefMovie: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitPost = this.handleSubmitPost.bind(this);
    this.handleSubmitMovie = this.handleSubmitMovie.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmitPost(event) {

    if (this.state.postSearchQuery.trim() === "") {
      this.setState({ errMessagePost: "Specify non-empty query." })
    }
    else {
      const axiosOptions = {
        'method': 'GET',
        'url': 'http://minerva.rashil2000.me/post/getAll',
      }

      axios(axiosOptions)
        .then(response => {
          this.setState({ postSearchResults: response.data });
        })
        .catch(error => {
          this.setState({ errMessagePost: "Not found." })
        })
    }
  }

  handleSubmitMovie(event) {

    if (this.state.movieSearchQuery.trim() === "") {
      this.setState({ errMessageMovie: "Specify non-empty query." })
    }
    else {
      const axiosOptions = {
        'method': 'GET',
        'url': 'http://minerva.rashil2000.me/movie/search',
        'params': {
          'q': this.state.movieSearchQuery
        }
      }

      axios(axiosOptions)
        .then(response => {
          this.setState({ movieSearchResults: response.data });
        })
        .catch(error => {
          this.setState({ errMessageMovie: "Not found." });
        })
    }
  }

  componentDidMount() {
    document.title = `Search - DYSTuss`;
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, margin: "10px auto" };
    const textStyle: React.CSSProperties = {
      margin: "10px",
      width: "auto"
    };
    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
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
          <p style={{ fontSize: 30, textAlign: 'left', width: '49%', display: 'inline-block' }}>Search</p>
          <p style={{ fontSize: 15, textAlign: 'right', width: '50%', display: 'inline-block' }}>Find Related Content</p>
        </div>
        <div {...classes.root} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "30px" }}>
          <div {...classes.acrylic60}>
            <p style={{ fontSize: "20px", margin: "0px 10px 20px 10px" }}>Search previous posts: </p>
            <TextBox
              name="postSearchQuery"
              style={textStyle}
              placeholder="Type title, genre, cast, crew etc..."
              rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xE721;</span>}
              onChange={e => { this.setState({ postSearchQuery: e.target.value }) }}
            />
            <br />
            <span onClick={this.handleSubmitPost}>
              <a href={this.state.errHrefPost}><span>{this.state.errMessagePost}</span></a>
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE773;</span>}
                label="Go"
                labelPosition="right"
              />
            </span>
          </div>
        </div>
        <div {...classes.root}>
          {this.state.postSearchResults.map(post => {
            return (
              <div className="postlist-item" key={post.id}>
                <Link to={'/post/' + post.id}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title">{post.title}</div>
                    <div className="postlist-details">
                      <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xEFD3;</span>&nbsp; {post.author_username}</div>
                      <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; {post.numComments}</div>
                      <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; {post.upvotes - post.downvotes}</div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div {...classes.acrylic60} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          <p style={{ fontSize: "20px", margin: "0px 10px 20px 10px" }}>Or search the Internet Movie Database (IMDb): </p>
          <TextBox
            name="movieSearchQuery"
            style={textStyle}
            placeholder="Type title, genre, cast, crew etc..."
            rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xE721;</span>}
            onChange={e => { this.setState({ movieSearchQuery: e.target.value }) }}
          />
          <br />
          <span onClick={this.handleSubmitMovie}>
            <a href={this.state.errHrefMovie}><span>{this.state.errMessageMovie}</span></a>
            <AppBarButton
              style={buttonStyle}
              icon={<span className="sdl2asset">&#xF3F1;</span>}
              label="Go"
              labelPosition="right"
            />
          </span>
        </div>
        <div {...classes.root}>
          {this.state.movieSearchResults.map(movie => {
            return (
              <div className="postlist-item" key={movie.imdb_ID}>
                <Link to={'/movie/' + movie.imdb_ID}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title" style={{ fontSize: "16px" }}>{movie.title} ({movie.year})</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}