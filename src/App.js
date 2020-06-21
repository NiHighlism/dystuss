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

export default class App extends React.Component {
  render() {
    let name, color, backimg, value, hr;
    hr = new Date().getHours();
    if (hr >= 1 && hr < 4) value = "Midnight";
    else if (hr >= 4 && hr < 6) value = "Dawn";
    else if (hr >= 6 && hr < 9) value = "Morning";
    else if (hr >= 9 && hr < 12) value = "Midmorning";
    else if (hr >= 12 && hr < 17) value = "Afternoon";
    else if (hr >= 17 && hr < 20) value = "Dusk";
    else if (hr >= 20 && hr < 22) value = "Evening";
    else value = "Night";
    switch (value) {
      case "Midnight":
        name = "dark";
        color = "#afbda6";
        backimg = "/assets/firewatch_1.jpg";
        break;
      case "Dawn":
        name = "dark";
        color = "#f2c548";
        backimg = "/assets/firewatch_2.jpg";
        break;
      case "Morning":
        name = "light";
        color = "#306458";
        backimg = "/assets/firewatch_3.jpg";
        break;
      case "Midmorning":
        name = "light";
        color = "#3c6e8f";
        backimg = "/assets/firewatch_4.jpg";
        break;
      case "Afternoon":
        name = "light";
        color = "#9a5126";
        backimg = "/assets/firewatch_5.jpg";
        break;
      case "Dusk":
        name = "dark";
        color = "#f5ba54";
        backimg = "/assets/firewatch_6.jpg";
        break;
      case "Evening":
        name = "dark";
        color = "#95d1e9";
        backimg = "/assets/firewatch_7.jpg";
        break;
      default:
        name = "dark";
        color = "#a0a5ab";
        backimg = "/assets/firewatch_8.jpg";
    }

    return (
      <BrowserRouter>
        <div className="App">
          <Theme
            theme={getTheme({
              themeName: name,
              accent: color,
              useFluentDesign: true,
              desktopBackgroundImage: backimg
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
