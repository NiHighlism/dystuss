import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default class Feed extends React.Component {

  componentDidMount() {
    document.title = "DYSTuss"
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

    const posts = [
      { id: 9, title: "Ben-Hur versus Titanic: The tale of the 11 oscars", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 1, title: '[Review] Parasite (2019)', author: 'Kanishka Gandhi', commentcount: 3, appeal: -9 },
      { id: 6, title: "Omar Sharif : From Zenith to Nadir", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 2, title: "Schindler's List - After 25 Years", author: 'Rashil Gandhi', commentcount: 5, appeal: 20 },
      { id: 3, title: "Anurag Kashyap's Greatest Masterpiece", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 4, title: "Jaane Bhi Do Yaaron - Things Hardly Change", author: 'Susheel Gandhi', commentcount: 32, appeal: 1 },
      { id: 7, title: "Django versus Unchained: What did Tarantino infuse?", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 },
      { id: 5, title: "DiCaprio's Well Deserved Oscar", author: 'Mukul Mehta', commentcount: 2, appeal: 10 },
      { id: 8, title: "Sandra Bullock: Worst one day, best the next", author: 'Pratim Majumdar', commentcount: 25, appeal: 321 }
    ]

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
          <p style={{ fontSize: 30, textAlign: 'left', width: '49%', display: 'inline-block' }}>Feed</p>
          <p style={{ fontSize: 15, textAlign: 'right', width: '50%', display: 'inline-block' }}>DYSTuss's Homepage</p>
        </div>
        <div {...classes.root}>
          {posts.map(post => {
            return (
              <div className="postlist-item" key={post.id}>
                <Link to={'/post/' + post.id}>
                  <div {...classes.acrylic60}>
                    <div className="postlist-title">{post.title}</div>
                    <div className="postlist-details">
                      <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xEFD3;</span>&nbsp; {post.author}</div>
                      <div style={{ display: 'inline-block', marginRight: "20px" }}><span className="sdl2asset">&#xF70F;</span>&nbsp; {post.commentcount}</div>
                      <div style={{ display: 'inline-block' }}><span className="sdl2asset">&#xE3AF;</span>&nbsp; {post.appeal}</div>
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