import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Feed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post_list: [],

      errMessage: ''
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    let url = 'https://vidura.rashil2000.me/post/getAll';
    const axiosOptions = {
      'method': 'GET',
      'url': url
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({
          post_list: response.data,
        })
      })
      .catch(error => { /* console.log(error) */ })
  }

  componentDidMount() {
    document.title = "DYSTuss";
    this.getData();
  }


  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;
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
          <p style={{ fontSize: 30, textAlign: 'left', width: '49%', display: 'inline-block' }}>Feed</p>
          <p style={{ fontSize: 15, textAlign: 'right', width: '50%', display: 'inline-block' }}>DYSTuss's Homepage</p>
        </div>
        <div {...classes.root}>
          {this.state.post_list.map(post => {
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
      </div>
    );
  }
}