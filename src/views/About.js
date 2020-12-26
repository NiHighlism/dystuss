import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from 'react-redux'
import { getTheme } from "react-uwp/Theme";
import HyperLink from "react-uwp/HyperLink";
import DropDownMenu from "react-uwp/DropDownMenu";
import AppBarButton from "react-uwp/AppBarButton";
import * as actionCreators from '../store/actions/actionCreators'

class About extends React.Component {

  componentDidMount() {
    document.title = "About - DYSTuss"
  }

  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;

    const buttonStyle = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, padding: "0px", cursor: "pointer" };
    const linkStyle = {
      fontSize: 18,
      textDecoration: "none",
      padding: 0,
      margin: 0
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
    const resp = (window.innerWidth >= 900) ? false : true;
    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>About</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <a href="https://rashil2000.me" target="__blank">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xF25F;</span>}
                label="rashil2000.me"
                labelPosition="right"
              />
            </a>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.acrylic80} style={{ fontSize: 16, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          <p style={{ fontSize: 18, marginBottom: '20px' }}>Choose Theme</p>
          <DropDownMenu
            values={[
              <span className="sdl2asset">&#xE790;</span>,
              "Midnight",
              "Dawn",
              "Morning",
              "Midmorning",
              "Afternoon",
              "Dusk",
              "Evening",
              "Night",
              "Auto-change"
            ]}
            enableFullWidth={resp}
            style={{ background: theme.useFluentDesign ? theme.acrylicTexture80.background : theme.chromeLow }}
            onChangeValue={value => {
              this.props.setTheme(value);
              theme.updateTheme(getTheme({
                themeName: this.props.themeDict[value].name,
                accent: this.props.themeDict[value].color,
                useFluentDesign: theme.useFluentDesign,
                desktopBackgroundImage: this.props.themeDict[value].backimg
              }));
            }}
          />
          <p style={{ fontSize: "14px", marginTop: "10px" }}>* Auto-change: Theme changes automatically based on time of day.</p>
        </div>
        <div {...classes.acrylic60} style={{ fontSize: 18, boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "20px" }}>
          <div className="about">
            <p>If you're still wondering, DYSTuss, pronounced like “discuss” but with ‘t’ instead of ‘c’, literally stands for Did You See This - discuss.</p>
            <p>DYSTuss creates a space for people to freely and anonymously discuss their ideas and thoughts about movies, shows and series, along with giving them the ability to maintain user profiles to keep track of what they have seen, what they wish to see, and get recommendations, both from the community and the ML-trained models.</p>
            <br /><hr /><br />
            <p>DYSTuss was created as a part of the Software Engineering Laboratory (CS29006), a second year undergraduate course offered in the spring semester at the <HyperLink style={linkStyle} href="http://iitkgp.ac.in/" target="__blank">Indian Institute of Technology Kharagpur</HyperLink>.</p>
            <p>The website implements the Fluent Design language and Fabric UI assets using React. On the back it is powered by Flask-RESTPlus API.</p>
            <p>The source code and requirement specifications can be seen in the GitHub <HyperLink style={linkStyle} href="https://github.com/rashil2000/dystuss" target="__blank">repository</HyperLink>.</p>
            <br /><hr /><br />
            <p>Made with &nbsp;<span className="sdl2asset" style={{ color: "red" }}>&#xEB52;</span>&nbsp; by Rashil Gandhi (18CS30036).</p>
            <p>To know more, go to my website on the top right.</p>
            <p>Or check out my <HyperLink style={linkStyle} href="https://github.com/rashil2000" target="__blank">GitHub</HyperLink> page to see some other projects.</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    theme: state.Theme,
    themeDict: state.themeDict
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setTheme: (theme) => dispatch(actionCreators.setTheme(theme))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
