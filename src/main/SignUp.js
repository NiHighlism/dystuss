import * as React from "react";
import * as PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { connect } from 'react-redux';
import TextBox from "react-uwp/TextBox";
import AppBarButton from "react-uwp/AppBarButton";
import PasswordBox from "react-uwp/PasswordBox";
import * as actionCreators from '../store/actions/actionCreators';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { email: '', username: '', bio: '', password: '', confPassword: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isLoggedIn() {
    return localStorage.getItem("access_token") !== null && localStorage.getItem("access_token") !== "undefined";
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    this.props.signUp(this.state.email, this.state.username, this.state.password, this.state.bio, this.state.confPassword);
  }

  componentDidMount() {
    document.title = "Sign Up - DYSTuss"
  }

  static contextTypes = { theme: PropTypes.object };

  render() {

    const auth = this.isLoggedIn();
    if (auth) {
      window.location.pathname = "/profile";
    }

    const { theme } = this.context;

    const resp = (window.innerWidth >= 600) ? "400px" : "auto";

    const buttonStyle = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow, cursor: "pointer" };
    const textStyle = {
      margin: "10px auto",
      width: resp
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
          <p style={{ fontSize: 30, float: "left" }}>Sign Up</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <NavLink to="/signin">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xF286;</span>}
                label="Sign In"
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
              onChange={e => {
                this.setState({ username: e.target.value })
              }}
            />
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
            <div style={{ fontSize: 22 }}>Bio: </div>
            <br />
            <TextBox
              name="bio"
              style={{ height: "100px", ...textStyle }}
              placeholder="About you"
              onChange={e => {
                this.setState({ bio: e.target.value })
              }}
            />
            <br />
            <div style={{ fontSize: 22 }}>Password: </div>
            <br />
            <PasswordBox
              name="password"
              style={textStyle}
              placeholder="Password"
              onChangeValue={(event) => this.setState({ password: event })}
            />
            <br />
            <div style={{ fontSize: 22 }}>Confirm Password: </div>
            <br />
            <PasswordBox
              name="confPassword"
              style={textStyle}
              placeholder="Password"
              onChangeValue={(event) => this.setState({ confPassword: event })}
            />
            <br />
            <br />
            <span onClick={this.handleSubmit}>
              <a href={this.props.followLink}><span>{this.props.message}</span></a>
              <AppBarButton
                style={{ margin: "10px auto", ...buttonStyle }}
                icon={<span className="sdl2asset">&#xE8FA;</span>}
                label="Sign Up"
                labelPosition="right"
              />
            </span>
            <br />
            <Link to="/resendVerification" style={{ color: theme.accent }}>Didn't receive confirmation mail?</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.signUpMessage,
    followLink: state.signUpFollowLink
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, username, password, bio, confPassword) => dispatch(actionCreators.signUp(email, username, password, bio, confPassword))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
