import * as React from "react";
import * as PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from 'axios';

import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";


export default class ForgotPassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', errMessage: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    const axiosOptions = {
      'method': 'POST',
      'url': `${process.env.REACT_APP_DB_HOST}/auth/reset/request`,
      'data': {
        'email': this.state.email,
      }
    }

    axios(axiosOptions)
      .then(response => {
        this.setState({ errMessage: "Ah, Dementia. Reset mail sent!" });
      })
      .catch(error => {
        let status = error.response.status

        if (status === 401) {
          this.setState({
            errMessage: "User is not registered. Please sign up first.",
            errHref: "/signup"
          });
        }
        else {
          this.setState({ errMessage: "It's not you, it's us. Try again later." })
        }
      })
  }

  componentDidMount() {
    document.title = "Forgot Password - DYSTuss"
  }

  static contextTypes = { theme: PropTypes.object };

  render() {
    const { theme } = this.context;

    const buttonStyle = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, cursor: "pointer" };
    const textStyle = {
      margin: "10px auto"
    };
    const itemStyle = {
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
          <p style={{ fontSize: 30, float: "left" }}>Reset Password</p>
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
            <div style={{ fontSize: 22 }}>Email: </div>
            <br />
            <TextBox
              name="email"
              style={textStyle}
              placeholder="Email"
              onChange={e => {
                this.setState({ email: e.target.value })
              }}
            />
            <br />
            <span onClick={this.handleSubmit}>
              <a href={this.state.errHref}><span>{this.state.errMessage}</span></a>
              <AppBarButton
                style={{ margin: "10px auto", ...buttonStyle }}
                icon={<span className="sdl2asset">&#xF286;</span>}
                label="Send Mail!"
                labelPosition="right"
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}