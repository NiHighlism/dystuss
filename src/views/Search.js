import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";

export default class Search extends React.Component {

  componentDidMount(){
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

    const postResults = [
      { id: 9, title: "Ben-Hur versus Titanic: The tale of the 11 oscars", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 1, title: '[Review] Parasite (2019)', author: 'Kanishka Gandhi', commentcount: 3, appeal: -9 },
      { id: 6, title: "Omar Sharif : From Zenith to Nadir", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 }
    ];

    const imdbResults = [
      { id: 9, title: "Ben-Hur versus Titanic: The tale of the 11 oscars", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 1, title: '[Review] Parasite (2019)', author: 'Kanishka Gandhi', commentcount: 3, appeal: -9 },
      { id: 6, title: "Omar Sharif : From Zenith to Nadir", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 2, title: "Schindler's List - After 25 Years", author: 'Rashil Gandhi', commentcount: 5, appeal: 20 }
    ];

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
              style={textStyle}
              placeholder="Type title, genre, cast, crew etc..."
              rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xE721;</span>}
            />
            <br />
            <AppBarButton
              style={buttonStyle}
              icon={<span className="sdl2asset">&#xE773;</span>}
              label="Go"
              labelPosition="right"
            />
          </div>
        </div>
        <div {...classes.root}>
          {postResults.map(post => {
            return (
              <div className="postlist-item" key={post.id}>
                <Link to={'/post/' + post.id}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title" style={{ fontSize: "16px" }}>{post.title}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
        <div {...classes.acrylic60} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          <p style={{ fontSize: "20px", margin: "0px 10px 20px 10px" }}>Or search the Internet Movie Database (IMDb): </p>
          <TextBox
            style={textStyle}
            placeholder="Type title, genre, cast, crew etc..."
            rightNode={<span className="sdl2asset" style={{ marginRight: "10px" }}>&#xE721;</span>}
          />
          <br />
          <AppBarButton
            style={buttonStyle}
            icon={<span className="sdl2asset">&#xF3F1;</span>}
            label="Go"
            labelPosition="right"
          />
        </div>
        <div {...classes.root}>
          {imdbResults.map(post => {
            return (
              <div className="postlist-item" key={post.id}>
                <Link to={'/post/' + post.id}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title" style={{ fontSize: "16px" }}>{post.title}</div>
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