//import edConnectionService from "domain/ed/services/ed-connection-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  genreSongList = [],
  blendSongList = [],
  edDiscoverService,
  edConnectionService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getSongIDs( genreID ) {
    edConnectionService.request( genreID )
      .then( msg => {
        genreSongList = msg;
        return genreSongList;
      })
      .catch( error => {
        throw error;
      });
  },

  getGenreIDs() {
    edConnectionService.request( "profileBlend" )
      .then( msg => {
        currentProfileBlend = msg;
        return currentProfileBlend;
      })
      .catch( error => {
        throw error;
      });
  },

  getDiscoverSongList( data ) {
    if ( data === "profileBlend" ) {
      getGenreIDs();
      currentProfileBlend.forEach( genreID => {
        blendSongList.push( getSongIDs( genreID ) );
      });
      return blendSongList;
    } else if ( data instanceof EDGenre ) {
      getSongIDs();
    }
  },

  setUserBlend( EDGenre ) {
    return EDGenre;
    // this songList is now the currentProfileBlend
  }
};
