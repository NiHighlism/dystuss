import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Theme, getTheme } from "react-uwp/Theme";
import Navigation from "./main/Navigation";
import SignIn from "./main/SignIn";
import SignUp from "./main/SignUp";
import ForgotPassword from "./main/ForgotPassword";
import ResendEmail from "./main/ResendEmail";
import Feed from "./views/Feed";
import Post from "./views/Post";
import Search from "./views/Search";
import CreatePost from "./views/CreatePost";
import Profile from "./views/Profile";
import About from "./views/About";
import Movie from "./views/Movie";
import Error404 from "./main/Error404";
import PrivateRoute from "./main/PrivateRoute.js";
import { connect } from 'react-redux';

class App extends React.Component {

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.theme.color !== this.props.theme.color || nextProps.theme.color === this.props.theme.color ){
      return false;
    }
  }

  render() {
    
    return (
      <BrowserRouter>
        <div className="App">
          <Theme
            theme={getTheme({
              themeName: this.props.theme.name,
              accent: this.props.theme.color,
              useFluentDesign: true,
              desktopBackgroundImage: this.props.theme.backimg
            })}
          >
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route exact path="/post/:imdb_id" component={Post} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/movie/:imdb_id" component={Movie} />
              <Route exact path="/about" component={About} />
              <Route exact path="/forgotPassword" component={ForgotPassword} />
              <Route exact path="/resendVerification" component={ResendEmail} />
              <PrivateRoute exact path="/create" component={CreatePost} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route path="*" component={Error404} />
            </Switch>
            <Navigation />
          </Theme>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = ( state ) => {
  return {
    theme : state.Theme
  }
}

const mapDispatchToProps = null

export default connect(mapStateToProps,mapDispatchToProps)(App);
