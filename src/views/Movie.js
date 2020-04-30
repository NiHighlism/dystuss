import * as React from "react";
import * as PropTypes from "prop-types";
import axios from 'axios';

import AppBarButton from "react-uwp/AppBarButton";
import Button from "react-uwp/Button";

export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      imdb_ID: '',
      title: '',
      actorsList: [],
      genreList: [],
      directorList: [],
      imdb_rating: '',
      plot: '',
      languageList: [],
      year : '',
      runtime: '',
      release_date: '',
      poster_url: '',
      writerList: [],
      awards: '',
      rotten_tomatoes: '',
      metascore: '',

      errMessage : ''
    };

    this.getData = this.getData.bind(this);
  }

  getData(){
    let imdb_id = window.location.pathname.split("/")[2];
    let url = 'http://minerva.metamehta.me/movie/' + imdb_id;
    const axiosOptions = {
      'method' : 'GET',
      'url' : url,
      headers :{
        'Authorization' : localStorage.getItem("access_token")
      }
    }

    axios(axiosOptions)
    .then(response => {
      this.setState({
        imdb_ID : response.data.imdb_ID,
        title: response.data.title,
        actorsList: response.data.actors.actorsList,
        genreList : response.data.genre.genreList,
        directorList: response.data.director.directorList,
        imdb_rating: response.data.imdb_rating,
        plot : response.data.plot,
        year: response.data.year,
        runtime: response.data.runtime,
        release_date : response.data.release_date,
        poster_url : response.data.poster_url,
        writerList : response.data.writer.writerList,
        languageList : response.data.language.languageList,
        rotten_tomatoes : response.data.rotten_tomatoes,
        metascore : response.data.metascore,
        awards: response.data.awards
      })
    })
    .catch(error => { console.log(error)})
  }

  componentDidMount(){
    this.setState({imdb_id: window.location.pathname.split("/")[2]})
    this.getData();
  }

  static contextTypes = { theme: PropTypes.object};
  context: { theme: ReactUWP.ThemeType};

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
          <p style={{ fontSize: 30, float: "left" }}>{this.state.title} ({this.state.year})</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <a href={`https://imdb.com/title/${this.state.imdb_ID}`} target="__blank">
              <AppBarButton
                style={buttonStyle}
                icon={<span className="sdl2asset">&#xF35F;</span>}
                label="IMDb"
                labelPosition="right"
              />
            </a>
          </p>
          <div style={{ clear: "both" }}></div>
        </div>
        <div {...classes.root}>
          <div className="movie-meta">
            <div {...classes.acrylic80}>
              <img src={this.state.poster_url} alt="poster" style={{ padding: "20px" }}></img>
              <br />
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xF059;</span>&nbsp; Released on: {this.state.release_date}</p>
              <br />
              <p><span className="sdl2asset">&#xE91E;</span>&nbsp; Runtime: {this.state.runtime}</p>
              <br />
              <p><span className="sdl2asset">&#xF2B7;</span>&nbsp; Languages: {this.state.languageList.join(" | ")}</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE734;</span>&nbsp; Ratings: </p>
              <br />
              <p>IMDb: {this.state.imdb_rating}</p>
              <br />
              <p>Rotten Tomatoes: {this.state.rotten_tomatoes}</p>
              <br />
              <p>Metascore: {this.state.metascore}</p>
              <br />
            </div>
          </div>
          <div className="movie-details">
            <div {...classes.acrylic60}>
              <div style={{ fontSize: 20, marginTop: "15px" }}>{this.state.plot}</div>
              <br />
              <div style={{ fontSize: 18 }}>Awards: {this.state.awards}</div>
              <br />
              <div style={{ fontSize: 20 }}>Directed by: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.directorList.map(item => (<li style={{ marginBottom: "10px" }}>{item}</li>))}
              </ul>
              <br />
              <div style={{ fontSize: 20 }}>Cast: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.actorsList.map(item => (<li style={{ marginBottom: "10px" }}>{item}</li>))}
              </ul>
              <br />
              <div style={{ fontSize: 20 }}>Genres: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {this.state.genreList.map(item => (<li style={{ margin: "10px", display: "inline-block" }}>> {item}</li>))}
              </ul>
              <br />
              <Button style={{margin: "10px", ...buttonStyle}} icon={<span className="sdl2asset">&#xE73A;&nbsp;</span>}> Add to Seen List</Button>
              <Button style={{margin: "10px", ...buttonStyle}} icon={<span className="sdl2asset">&#xECDE;&nbsp;</span>}> Add to Bucket List</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}