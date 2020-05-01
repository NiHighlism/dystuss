import * as React from "react";
import * as PropTypes from "prop-types";
import axios from 'axios'

import AppBarButton from "react-uwp/AppBarButton";


export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "username": "",
      "first_name": "",
      "last_name": "",
      "email": "",
      "create_date": "",
      "bio": "",
      "seenList": [],
      "bucketList": [],
      "recommendList": []
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    let username = localStorage.getItem("username");
    let url = 'http://minerva.rashil2000.me/user/' + username;
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Authorization': localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
      .then(response => {
        console.log(response.data);
        this.setState({
          username: response.data.username,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
          bio: response.data.bio,
          create_date: response.data.create_date
        })
      })
      .catch(error => { console.log(error) })
  }

  getSeenData() {
    let username = localStorage.getItem("username");
    let url = 'http://minerva.rashil2000.me/user/' + username + '/getSeenList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }))
        arr.pop();
        this.setState({
          seenList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  getBucketData() {
    let username = localStorage.getItem("username");
    let url = 'http://minerva.rashil2000.me/user/' + username + '/getBucketList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }));
        arr.pop();
        this.setState({
          bucketList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  getRecommendData() {
    let username = localStorage.getItem("username");
    let url = 'http://minerva.rashil2000.me/user/' + username + '/getRecommendList';
    const axiosOptions = {
      'method': 'GET',
      'url': url,
      headers: {
        'Content-Type': 'application/json'
      },
    }

    axios(axiosOptions)
      .then(response => {
        let arr = [];
        Object.getOwnPropertyNames(response.data).map(item => arr.push({ item, movie: response.data[item] }));
        arr.pop();
        this.setState({
          recommendList: arr
        })
      })
      .catch(error => { console.log(error) })
  }

  componentDidMount() {
    this.getData();
    this.getSeenData();
    this.getBucketData();
    this.getRecommendData();
  }

  componentWillReceiveProps() {
    document.title = `Profile - ${this.state.username} - DYSTuss`;
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
                {this.state.seenList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>
                  <p style={{ float: "left" }}>{item.movie.movie}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset">&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xECDE;</span>&nbsp; Stuff to be seen: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.bucketList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>
                  <p style={{ float: "left" }}>{item.movie.movie}</p>
                  <p style={{ float: "right" }}><span className="sdl2asset">&#xE711;</span></p>
                  <div style={{ clear: "both" }}></div>
                </li>))}
              </ul>
              <br />
              <p style={{ fontSize: 18 }}><span className="sdl2asset">&#xE3B8;</span>&nbsp; Recommendations: </p>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.recommendList.map(item => (<li style={{ marginBottom: "10px" }} key={item.movie.imdb_ID}>{item.movie.movie}</li>))}
              </ul>
            </div>
          </div>
          <div className="profile-meta">
            <div {...classes.acrylic80}>
              <div className="sdl2asset" style={{ fontSize: 50 }}>&#xEBF7;</div>
              <br />
              <p style={{ fontSize: 18 }}>{this.state.username}</p>
              <br />
              <p style={{ fontSize: 16 }}>{this.state.bio}</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE8F3;</span>&nbsp; 4 Posts</p>
              <br />
              <p><span className="sdl2asset">&#xE9D5;</span>&nbsp; {this.state.seenList.length} Seen Items</p>
              <br />
              <p><span className="sdl2asset">&#xE8FD;</span>&nbsp; {this.state.bucketList.length} Bucket Items</p>
              <br />
              <p><span className="sdl2asset">&#xEF74;</span>&nbsp; {this.state.recommendList.length} Recommendations</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE787;</span>&nbsp; Joined {this.state.create_date}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}