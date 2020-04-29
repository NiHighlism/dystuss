import * as React from "react";
import * as PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import axios from 'axios'

import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import PasswordBox from "react-uwp/PasswordBox";
import CheckBox from "react-uwp/CheckBox";


export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: '' , password: '', errMessage : '', errHref : ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
        [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    
    const axiosOptions = {
      'method' : 'POST',
      'url' : 'http://localhost:5000/auth/login',
      'data' : {
        'username' : this.state.username,
        'password' : this.state.password,
        'remember' : 'false'
      }
    }

    axios(axiosOptions)
    .then(response => {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('userID', response.data.id);
      localStorage.setItem('username', response.data.username);
      window.location.pathname = "/profile";
    })
    .catch(error => {
      let status = error.response.status;
      if (status === 401){
        this.setState({errMessage : "Couldn't verify. Please check credentials!"});
      }

      if (status === 402){
        this.setState({errMessage : "Please verify your email before signing in. ", errHref: "/resendVerification"});
      }

      if (status === 403){
        this.setState({errMessage : "Account to bana le pehle. ", errHref: "/signup"});
      }

      else{
        this.setState({errMessage : "It's not you, it's us. Try later!"});
      }
    })

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
              onChange={ e => {
                this.setState({username: e.target.value})
              }}
            />
            <br />
            <div style={{ fontSize: 22 }}>Password: </div>
            <br />
            <PasswordBox
              name="password"
              style={textStyle}
              placeholder="Password"
              onChangeValue={(event) => this.setState({password: event})}
            />
            <br />
            <CheckBox
              defaultChecked={false}
              label="Keep me signed in"
            />
            <br />
            <br />
            <a href={this.state.errHref}><span>{this.state.errMessage}</span></a>
            <span onClick={this.handleSubmit}>
            <AppBarButton
              style={{ margin: "10px auto", ...buttonStyle }}
              icon={<span className="sdl2asset">&#xF286;</span>}
              label="Sign In"
              labelPosition="right"
            /></span>
          </div>
        </div>
      </div>
    );
  }
}