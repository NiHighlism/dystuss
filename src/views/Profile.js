import * as React from "react";
import * as PropTypes from "prop-types";
import AppBarButton from "react-uwp/AppBarButton";


export default class Profile extends React.Component {

  componentWillReceiveProps(){
    document.title = `Username - DYSTuss`; // TODO: Change this to state.username
  }

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const { theme } = this.context;

    const buttonStyle: React.CSSProperties = { background: theme.useFluentDesign ? theme.listLow : theme.chromeLow };
    const itemStyle: React.CSSProperties = {
      fontWeight: "lighter",
      width: '100%',
      padding: '20px',
    };
    const styles = {
      root: theme.prefixStyle({
        display: "flex",
        flexDirection: "row",
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

    const seenList = [
      "Syriana (2006)",
      "American Sniper (2014)",
      "The Good, The bad and the Ugly (1969)",
      "Titanic (1997)",
      "Dallas Buyers Club (2014)",
      "Up in the air (2011)",
      "L.A. Confidential (1997)",
      "Flight (2012)",
      "Unforgiven (1992)",
      "Godfather (1972)",
      "Raging Bull (1980)",
      "The Score (2002)",
      "Spenser Confidential (2020)"
    ];
    const bucketList = [
      "Mystic River (2003)",
      "Philadelphia (1993)",
      "Forrest Gump (1994)",
      "Rebecca (1942)",
      "Vertigo (1958)",
      "Gone with the wind (1927)",
      "Psycho (1960)",
      "McKenna's Gold (1969)",
      "Margin Call (2001)"
    ];
    const recommendedList = [
      "The Departed (2006)",
      "Body of lies (2008)",
      "Lincoln Lawyer (2011)",
      "The Devil wears Prada (2006)",
      "Salt (2010)",
      "The Blind Side (2009)"
    ];

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>Profile</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <AppBarButton
              style={buttonStyle}
              icon={<span className="sdl2asset">&#xF3B1;</span>}
              label="Sign Out"
              labelPosition="right"
            />
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root}>
          <div className="profile-details">
            <div {...classes.acrylic60}>
              <div style={{ fontSize: 24 }}>Dashboard</div>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xE73A;</span>&nbsp; Stuff already seen: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {seenList.map(item => (<li style={{ marginBottom: "10px" }}>
                  <p style={{ float: "left" }}>{item}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset">&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xECDE;</span>&nbsp; Stuff to be seen: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {bucketList.map(item => (<li style={{ marginBottom: "10px" }}>
                  <p style={{ float: "left" }}>{item}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset">&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xE3B8;</span>&nbsp; Recommendations: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {recommendedList.map(item => (<li style={{ marginBottom: "10px" }}>{item}</li>))}
              </ul>
            </div>
          </div>
          <div className="profile-meta">
            <div {...classes.acrylic80}>
              <div className="sdl2asset" style={{ fontSize: 50 }}>&#xEBF7;</div>
              <br />
              <p style={{ fontSize: 18 }}>Rashil Gandhi</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE8F3;</span>&nbsp; 4 Posts</p>
              <br />
              <p><span className="sdl2asset">&#xE9D5;</span>&nbsp; {seenList.length} Seen Items</p>
              <br />
              <p><span className="sdl2asset">&#xE8FD;</span>&nbsp; {bucketList.length} Bucket Items</p>
              <br />
              <p><span className="sdl2asset">&#xEF74;</span>&nbsp; {recommendedList.length} Recommendations</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE787;</span>&nbsp; Joined 13th July</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}