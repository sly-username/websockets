// import edConnectionService from "domain/ed/services/ed-connection-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  trackIdList = [],
  edDiscoverService,
  edConnectionService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getTrackIDs( genreID ) {
    if ( !currentProfileBlend.length ) {
      throw new Error( "no genre ids available!" );
    }

    return edConnectionService.request( genreID )
      .then( msg => {
        trackIdList = msg.tracks;
        // we're assuming we get a list of track ids from the server
        return trackIdList;
      })
      .catch( error => {
        throw error;
      });
  },

  getGenreIDs() {
    return edConnectionService.request( "profileBlend" )
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
        trackIdList.push( getTrackIDs( genreID ) );
        // I set trackIdList to be an array, but then we pushing arrays into arrays
        // not sure what to do here.
      });
      return trackIdList;
      // is this return in the proper place?
    } else if ( data instanceof EDGenre ) {
      // should we create a variable?
      var ids = getTrackIDs( data.id );
      trackIdList.push( ids );
    }
    // do we need to throw an error if it doesn't fall in these 2 conditions?
  },

  setUserBlend( EDGenre ) {

    return EDGenre;
    // this songList is now the currentProfileBlend
  }
};
