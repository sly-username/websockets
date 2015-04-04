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
    } else if ( data instanceof EDGenre ) {
      // should we create the variable below?
      // if so, where should it go?
      var ids = getTrackID( data.id );
      trackIDList.push( ids );
    } else {
      throw Error;
    }
  },

  setUserBlend( changedProfileBlend ) {
    // not sure how we know when the user changes it genre preferences
    // or where this happens
    // lots of questions
    changedProfileBlend = currentProfileBlend;

    // not sure if it's properly returning what I want it to return
    currentProfileBlend.forEach( genreID => {
      return edConnectionService.request( genreID )
        .then( msg => {
          trackIDList = msg.tracks;
          trackIDList.push( getTrackID( genreID ) );
          // will this continue to push the tracks to my trackIDList array as it iterates??
          return trackIDList;
        })
        .catch( error => {
          throw error;
        });
    });
  }
};
