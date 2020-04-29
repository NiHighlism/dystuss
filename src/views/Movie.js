import * as React from "react";
import * as PropTypes from "prop-types";
import AppBarButton from "react-uwp/AppBarButton";

export default class Movie extends React.Component {
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

    const movieMeta = {
      "total_pages": 1,
      "imdb_ID": "tt1596363",
      "title": "The Big Short",
      "year": 2015,
      "runtime": "130 min",
      "release_date": "23 Dec 2015",
      "plot": "In 2006-2007 a group of investors bet against the US mortgage market. In their research they discover how flawed and corrupt the market is.",
      "genre": {
        "genreList": [
          "Biography",
          "Comedy",
          "Drama",
          "History"
        ]
      },
      "director": {
        "directorList": [
          "Adam McKay"
        ]
      },
      "writer": {
        "writerList": [
          "Charles Randolph (screenplay by)",
          "Adam McKay (screenplay by)",
          "Michael Lewis (based upon the book by)"
        ]
      },
      "actors": {
        "actorsList": [
          "Ryan Gosling",
          "Rudy Eisenzopf",
          "Casey Groves",
          "Charlie Talbert"
        ]
      },
      "language": {
        "languageList": [
          "English"
        ]
      },
      "country": {
        "countryList": [
          "USA"
        ]
      },
      "awards": "Won 1 Oscar. Another 37 wins & 80 nominations.",
      "imdb_rating": "7.8/10",
      "rotten_tomatoes": "88%",
      "metascore": "81/100",
      "poster_url": "https://m.media-amazon.com/images/M/MV5BNDc4MThhN2EtZjMzNC00ZDJmLThiZTgtNThlY2UxZWMzNjdkXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg",
      "box_office": "N/A"
    };

    return (
      <div className="content">
        <div {...classes.acrylic40} style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
          <p style={{ fontSize: 30, float: "left" }}>{movieMeta.title} ({movieMeta.year})</p>
          <p style={{ fontSize: 15, float: "right" }}>
            <a href={`https://imdb.com/title/${movieMeta.imdb_ID}`} target="__blank">
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
              <img src={movieMeta.poster_url} alt="poster" style={{ padding: "20px" }}></img>
              <br />
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xF059;</span>&nbsp; Released on: {movieMeta.release_date}</p>
              <br />
              <p><span className="sdl2asset">&#xE91E;</span>&nbsp; Runtime: {movieMeta.runtime}</p>
              <br /><hr /><br />
              <p><span className="sdl2asset">&#xE734;</span>&nbsp; Ratings: </p>
              <br />
              <p>IMDb: {movieMeta.imdb_rating}</p>
              <br />
              <p>Rotten Tomatoes: {movieMeta.rotten_tomatoes}</p>
              <br />
              <p>Metascore: {movieMeta.metascore}</p>
              <br />
            </div>
          </div>
          <div className="movie-details">
            <div {...classes.acrylic60}>
              <div style={{ fontSize: 20 }}>{movieMeta.plot}</div>
              <br />
              <div style={{ fontSize: 18 }}>Awards: {movieMeta.awards}</div>
              <br />
              <div style={{ fontSize: 20 }}>Directed by: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {movieMeta.director.directorList.map(item => (<li style={{ marginBottom: "10px" }}>{item}</li>))}
              </ul>
              <br />
              <div style={{ fontSize: 20 }}>Cast: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {movieMeta.actors.actorsList.map(item => (<li style={{ marginBottom: "10px" }}>{item}</li>))}
              </ul>
              <br />
              <div style={{ fontSize: 20 }}>Genres: </div>
              <ul style={{ margin: "20px", listStyleType: "disc" }}>
                {movieMeta.genre.genreList.map(item => (<li style={{ margin: "10px", display: "inline-block" }}>> {item}</li>))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}