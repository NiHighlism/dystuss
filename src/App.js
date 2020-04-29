import * as React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";
import Navigation from "./main/Navigation";
import Feed from "./views/Feed";
import Post from "./views/Post";
import SignIn from "./main/SignIn";
import SignUp from "./main/SignUp";
import Search from "./views/Search";
import CreatePost from "./views/CreatePost";
import Profile from "./views/Profile";
import About from "./views/About";

export default class App extends React.Component {
  render() {

    let name, color, backimg, value, hr;
    hr = new Date().getHours();
    if (hr >= 6 && hr < 12) value = "Morning";
    else if (hr >= 12 && hr < 16) value = "Noon";
    else if (hr >= 16 && hr < 20) value = "Evening";
    else value = "Night";
    switch (value) {
      case "Morning":
        name = "light";
        color = "#3c6e8f";
        backimg = "/assets/morning.jpg";
        break;
      case "Noon":
        name = "light";
        color = "#306458";
        backimg = "/assets/noon.jpg";
        break;
      case "Evening":
        name = "dark";
        color = "#f5ba54";
        backimg = "/assets/evening.jpg";
        break;
      default:
        name = "dark";
        color = "#afbda6";
        backimg = "/assets/night.jpg";
    }

    return (
      <BrowserRouter>
        <div className="App">
          <UWPThemeProvider
            theme={getTheme({
              themeName: name,
              accent: color,
              useFluentDesign: true,
              desktopBackgroundImage: backimg
            })}
          >
            <Switch>
              <Route exact path="/" component={Feed} />
              <Route path="/post/:id" component={Post} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/search" component={Search} />
              <Route path="/create" component={CreatePost} />
              <Route path="/profile" component={Profile} />
              <Route path="/about" component={About} />
            </Switch>
            <Navigation />
          </UWPThemeProvider>
        </div>
      </BrowserRouter>
    )
  }
}
