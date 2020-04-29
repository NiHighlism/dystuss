import * as React from "react";
import * as PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import PasswordBox from "react-uwp/PasswordBox";
import axios from 'axios'


export default class SignIn extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { username: '' , password: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log("dekh be")
    this.setState({
        [event.target.name]: event.target.value
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    console.log(this.state.password)
    console.log(this.state)
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };
  
  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow };
    const textStyle: React.CSSProperties = {
      margin: "10px auto"
    };
    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
      textAlign: "center"
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
          <p style={{ fontSize: 30, float: "left" }}>Sign In</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <NavLink to="/signup">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xE8FA;</span>}
                label="Sign Up"
                labelPosition="right"
              />
            </NavLink>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', marginTop: "30px" }}>
          <div {...classes.acrylic60}>
            <br />
            <div style={{ fontSize: 22 }}>Username: </div>
            <br />
            <TextBox
              name="username"
              style={textStyle}
              placeholder="Username"
              onChange={this.handleChange}
            />
            <br />
            <div style={{ fontSize: 22 }}>Password: </div>
            <br />
            <PasswordBox
              name="password"
              style={textStyle}
              placeholder="Password"
              onChange={ e => {
                this.setState({username: e.target.value})
                console.log(e);
              }}
            />
            <br />
            <br />
            <AppBarButton
              style={{ margin: "10px auto", ...buttonStyle }}
              icon={<span className="sdl2asset">&#xF286;</span>}
              label="Sign In"
              labelPosition="right"
              onClick={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}