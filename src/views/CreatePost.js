import * as React from "react";
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import axios from "axios";

export default class CreatePost extends React.Component {

  constructor(props) {
    super(props);
    this.state = { title: '', content: '', meta: '', tags: '', errMessage: '', errHref: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {

    if (this.state.title.trim() === "" || this.state.content.trim() === "") {
      this.setState({ errMessage: "Specify non-empty title and content." })
    }
    else {
      const axiosOptions = {
        'method': 'POST',
        'url': 'https://vidura.rashil2000.me/post/create',
        'data': {
          'title': this.state.title,
          'body': this.state.content,
          'post_movie': this.state.meta,
          'tags': {
            'tagList': this.state.tags.split(",")
          }
        },
        headers: {
          'Authorization': localStorage.getItem("access_token")
        }
      }

      axios(axiosOptions)
        .then(response => {
          window.location.pathname = `/post/${response.data.id}`;
        })
        .catch(error => {
          let status = error.response.status
          console.log(error.response);

          if (status === 401) {
            this.setState({ errMessage: "This title already exists." });
          }
          else if (status === 403) {
            this.setState({ errMessage: "Post already exists." });
          }
          else {
            this.setState({ errMessage: "It's not you, it's us. Try again later." })
          }
        })
    }
  }

  componentDidMount() {
    document.title = "Create Post - DYSTuss"
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, margin: "10px auto" };
    const textStyle: React.CSSProperties = {
      margin: "10px auto",
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
          <p style={{ fontSize: 30, textAlign: 'left', width: '49%', display: 'inline-block' }}>Create</p>
          <p style={{ fontSize: 15, textAlign: 'right', width: '50%', display: 'inline-block' }}>Share Your Thoughts</p>
        </div>
        <div {...classes.root} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "30px" }}>
          <div {...classes.acrylic60}>
            <br />
            <div style={{ fontSize: 24 }}>Give a short and crisp title: </div>
            <br />
            <TextBox
              name="title"
              style={textStyle}
              placeholder="Title"
              onChange={e => { this.setState({ title: e.target.value }) }}
            />
            <br />
            <div style={{ fontSize: 22 }}>Write out what you feel: </div>
            <br />
            <textarea
              required
              wrap="soft"
              name="content"
              style={{
                ...textStyle,
                height: "200px",
                width: "100%",
                fontFamily: "Segoe UI",
                padding: "8px",
                fontSize: "15px",
                backgroundColor: "transparent",
                color: (theme.themeName === "dark") ? "white" : "black"
              }}
              placeholder="Content"
              onChange={e => { this.setState({ content: e.target.value }) }}
            />
            <span>*This field supports Markdown! Go <a href="https://guides.github.com/features/mastering-markdown/" style={{ color: theme.accent }}>here</a> to know how to use it.</span>
            <br />
            <br />
            <div style={{ fontSize: 20 }}>If applicable, mention name of movie/show/series: </div>
            <br />
            <TextBox
              name="meta"
              style={textStyle}
              placeholder="Meta"
              onChange={e => { this.setState({ meta: e.target.value }) }}
            />
            <br />
            <div style={{ fontSize: 18 }}>Give a comma-separated list of associated tags: </div>
            <br />
            <TextBox
              name="tags"
              style={textStyle}
              placeholder="Tags"
              onChange={e => { this.setState({ tags: e.target.value }) }}
            />
            <span>*These tags help people search your post by looking for keywords.</span>
            <br />
            <br />
            <span onClick={this.handleSubmit}>
              <a href={this.state.errHref}><span>{this.state.errMessage}</span></a>
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE898;</span>}
                label="Post"
                labelPosition="right"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}