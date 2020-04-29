import * as React from "react";
import * as PropTypes from "prop-types";
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";

export default class CreatePost extends React.Component {
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
              style={textStyle}
              placeholder="Title"
            />
            <br />
            <div style={{ fontSize: 22 }}>Write out what you feel: </div>
            <br />
            <TextBox
              style={{ height: "200px", ...textStyle }}
              placeholder="Content"
            />
            <br />
            <div style={{ fontSize: 20 }}>If applicable, mention name of movie/show/series: </div>
            <br />
            <TextBox
              style={textStyle}
              placeholder="Meta"
            />
            <br />
            <div style={{ fontSize: 18 }}>Give a comma-separated list of associated tags: </div>
            <br />
            <TextBox
              style={textStyle}
              placeholder="Tags"
            />
            <br />
            <br />
            <AppBarButton
              style={buttonStyle}
              icon={<span className="sdl2asset">&#xE898;</span>}
              label="Post"
              labelPosition="right"
            />
          </div>
        </div>
      </div>
    );
  }
}