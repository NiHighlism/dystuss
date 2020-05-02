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

      errMessage: ''
    };

    this.getData = this.getData.bind(this);
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

  componentDidMount() {
    this.setState({ imdb_id: window.location.pathname.split("/")[2] })
    this.getData();
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

    const clickComment = () => {
      // TODO: Add function to post comment
    }

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
            <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E1;</span>} />
            <AppBarButton style={{ display: "inline-block" }} labelPosition="collapsed" icon={<span className="sdl2asset">&#xE8E0;</span>} />
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
              rightNode={<span className="sdl2asset" onClick={clickComment}>&#xF2B3;&nbsp;&nbsp;</span>}
            />
          </div>
        </div>
        <div {...classes.root}>
          {this.state.comments.map(comment =>
            <div key={comment.id} {...classes.acrylic100} style={{ fontSize: 14, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "10px", width: "100%" }}>
              <p>{comment.content}</p>
              <p style={{ float: "left", paddingTop: "15px" }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; {comment.appeal}</p>
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