import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextBox from "react-uwp/TextBox";
import axios from "axios";

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postSearchQuery: '',
      postSearchResults: [],
      movieSearchQuery: '',
      movieSearchResults: [],

      errMessagePost: 'Insert a space after query.',
      errHrefPost: '',
      errMessageMovie: '',
      errHrefMovie: ''
    };
    this.handlePostSearch = this.handlePostSearch.bind(this);
    this.handleMovieSearch = this.handleMovieSearch.bind(this);
  }

  handlePostSearch(event) {
    this.setState({ postSearchQuery: event.target.value });

    if (this.state.postSearchQuery.trim() === "") {
      this.setState({ errMessagePost: "Insert a space after query." })
    }
    else {
      const axiosOptions = {
        'method': 'GET',
        'url': `${process.env.REACT_APP_DB_HOST}/post/getAll`,
        'params': {
          'q': this.state.postSearchQuery
        }
      }

      axios(axiosOptions)
        .then(response => {
          this.setState({ postSearchResults: response.data, errMessagePost: "" });
        })
        .catch(error => {
          this.setState({ postSearchResults: [], errMessagePost: "Not found." })
        })
    }
  }

  handleMovieSearch(event) {
    this.setState({ movieSearchQuery: event.target.value });

    if (this.state.movieSearchQuery.trim() === "") {
      this.setState({ errMessageMovie: "Insert a space after query." })
    }
    else {
      const axiosOptions = {
        'method': 'GET',
        'url': `${process.env.REACT_APP_DB_HOST}/movie/search`,
        'params': {
          'q': this.state.movieSearchQuery
        }
      }

      axios(axiosOptions)
        .then(response => {
          this.setState({ movieSearchResults: response.data, errMessageMovie: "" });
        })
        .catch(error => {
          this.setState({ movieSearchResults: [], errMessageMovie: "Not found." });
        })
    }
  }

  componentDidMount() {
    document.title = `Search - DYSTuss`;
  }

  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;

    const textStyle = {
      margin: "10px",
      width: "auto"
    };
    const itemStyle = {
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
              placeholder="Type title, cast, crew, tags etc..."
              rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xE773;</span>}
              onChange={this.handlePostSearch}
            />
            <br />
            <span>{this.state.errMessagePost}</span>
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
            rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xF3F1;</span>}
            onChange={this.handleMovieSearch}
          />
          <br />
          <span>{this.state.errMessageMovie}</span>
        </div>
        <div {...classes.root}>
          {this.state.movieSearchResults.map(movie => {
            return (
              <div className="postlist-item" key={movie.imdb_ID}>
                <Link to={'/movie/' + movie.imdb_ID}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title" style={{ fontSize: "16px" }}>{movie.title}</div>
                    <div className="postlist-title" style={{ fontSize: "14px" }}>{movie.year}</div>
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