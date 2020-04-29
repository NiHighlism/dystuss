import * as React from "react";
import * as PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";

import NavigationView from "react-uwp/NavigationView";
import SplitViewCommand from "react-uwp/SplitViewCommand";

class Navigation extends React.Component {
  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const baseStyle: React.CSSProperties = {
      height: '100vh',
      position: 'fixed',
      top: '0px',
      margin: 0,
      zIndex: 1000,
    };

    let matchUrl = this.props.location.pathname;

    const navigationTopNodes = [
      <NavLink to="/"><SplitViewCommand label="Feed" icon={<span className="sdl2asset">&#xE428;</span>} visited={matchUrl === `/`} /></NavLink>,
      <NavLink to="/search"><SplitViewCommand label="Search" icon={<span className="sdl2asset">&#xF4E9;</span>} visited={matchUrl === `/search`} /></NavLink>,
      <NavLink to="/create"><SplitViewCommand label="Create" icon={<span className="sdl2asset">&#xE43B;</span>} visited={matchUrl === `/create`} /></NavLink>
    ];

    const navigationBottomNode = [
      <NavLink to="/profile"><SplitViewCommand label="Profile" icon={<span className="sdl2asset">&#xE779;</span>} visited={matchUrl === `/profile`} /></NavLink>,
      <NavLink to="/about"><SplitViewCommand label="About" icon={<span className="sdl2asset">&#xF8B6;</span>} visited={matchUrl === `/about`} /></NavLink>
    ];

    const { theme } = this.context;

    const resp = (window.innerWidth >= 900) ? true : false;
    return (
      <NavigationView
        isControlled={resp}
        defaultExpanded={resp}
        style={baseStyle}
        pageTitle={<span style={{color: theme.accent}}>DYSTuss</span>}
        displayMode="overlay"
        autoResize={false}
        background={theme.listLow}
        initWidth={48}
        expandedWidth={300}
        navigationTopNodes={navigationTopNodes}
        navigationBottomNodes={navigationBottomNode}
        focusNavigationNodeIndex={0}
      >
      </NavigationView>
    );
  }
}

export default withRouter(Navigation);