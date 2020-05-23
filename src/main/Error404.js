import * as React from "react";
import * as PropTypes from "prop-types";
import { Link } from "react-router-dom";
import AppBarButton from "react-uwp/AppBarButton";

export default class Error404 extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  componentDidMount() {
    document.title = "Four, Oh Four!"
  }

  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, padding: "0px", cursor: "pointer" };
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
          <p style={{ fontSize: 30, float: "left" }}>Four, Oh Four!</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <Link to="/">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE80F;</span>}
                label="Home"
                labelPosition="right"
              />
            </Link>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.acrylic60} style={{ fontSize: 18, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px", textAlign: "center" }}>
          <div>
            <p style={{ fontSize: "30px" }}>Aww shuck, the reel is stuck...</p>
            <br />
            <p style={{ fontSize: "24px" }}>You seem to have fallen on a broken link. Not your fault though.</p>
            <br />
            <p style={{ fontSize: "18px" }}>Go back using the back button or go to the home page on the top right.</p>
            <br />
            <p style={{ fontSize: "16px" }}>Or go <Link to="/movie/tt1840309" style={{ color: theme.accent }}>here</Link> to know more about the mysterious character Four, who sits on the title of this page.</p>
          </div>
        </div>
      </div>
    );
  }
}