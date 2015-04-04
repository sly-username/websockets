// import edConnectionService from "domain/ed/services/ed-connection-service";
import EDGenre from "domain/ed/objects/EDGenre";

var currentProfileBlend = [],
  trackIDList = [],
  edDiscoverService,
  edConnectionService;

export default edDiscoverService = {

  get currentProfileBlend() {
    return currentProfileBlend;
  },

  getTrackID( genreID ) {
    return edConnectionService.request( genreID )
      .then( msg => {
        trackIDList = msg.tracks;
        // we're assuming we get an array of track ids from the server
        return trackIDList;
      })
      .catch( error => {
        throw error;
      });
  },

  getGenreID() {
    return edConnectionService.request( "profileBlend" )
      .then( msg => {
        currentProfileBlend = msg;
        return currentProfileBlend;
      })
      .catch( error => {
        throw error;
      });
  },

  getDiscoverTrackList( data ) {
    if ( data === "profileBlend" ) {
      getGenreID();
      currentProfileBlend.forEach( genreID => {
        trackIDList.push( getTrackID( genreID ) );
        // I set trackIDList to be an array, but then we pushing arrays into arrays
        // not sure what to do here.
      });
      return trackIDList;
      // is this return in the proper place?
    } else if ( data instanceof EDGenre ) {
      // should we create a variable?
      var ids = getTrackID( data.id );
      trackIDList.push( ids );
    }
    // do we need to throw an error if it doesn't fall in these 2 conditions?
  },

  setUserBlend( EDGenre ) {

    return EDGenre;
    // this trackList is now the currentProfileBlend
  }
};
