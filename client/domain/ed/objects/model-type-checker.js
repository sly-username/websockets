/*jshint strict: false*/

// Base EDModel
import EDModel from "domain/ed/objects/EDModel";

// Media Types
import EDMedia from "domain/ed/objects/media/EDMedia";
import EDTrack from "domain/ed/objects/media/EDTrack";

// User
import EDUser from "domain/ed/objects/EDUser";

// Profile Types
import EDProfile from "domain/ed/objects/profile/EDProfile";
import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDArtistGroup from "domain/ed/objects/profile/EDArtistGroup";
import EDFan from "domain/ed/objects/profile/EDFan";

// Misc Types
import EDBadge from "domain/ed/objects/EDBadge";
import EDGenre from "domain/ed/objects/EDGenre";

export default {
  constructorMap: {
    [ EDModel.TYPE ]: EDModel,
    [ EDMedia.TYPE ]: EDMedia,
    [ EDTrack.TYPE ]: EDTrack,
    [ EDUser.TYPE ]: EDUser,
    [ EDProfile.TYPE ]: EDProfile,
    [ EDFan.TYPE ]: EDFan,
    [ EDArtist.TYPE ]: EDArtist,
    [ EDArtistGroup.TYPE ]: EDArtistGroup,
    [ EDBadge.TYPE ]: EDBadge,
    [ EDGenre.TYPE ]: EDGenre
  },
  hasValidType( object ) {
    if ( typeof object.type === "string" ) {
      return this.isValidType( object.type );
    }

    return false;
  },
  isValidType( type ) {
    return type in this.constructorMap;
  },
  checkForInstanceOfType( type, object ) {
    if ( !( "type" in object ) ) {
      throw new TypeError( "No type found in object to check against" );
    }

    if ( type === object.type ) {
      return true;
    }

    if ( !( type in this.constructorMap ) ) {
      throw new TypeError( `Given type is not a valid EDModel type: ${type}` );
    }

    if ( !( object.type in this.constructorMap ) ) {
      throw new TypeError( `Given object with type, ${object.type} is not a valid EDModel type` );
    }

    return this.constructorMap[ type ].isPrototypeOf( this.constructorMap[ object.type ] );
  },
  fuzzyMatch( type, object ) {
    if ( object == null || typeof object.type !== "string" ) {
      throw new TypeError( "Object type is not a string" );
    }

    return object.type.indexOf( type ) > -1;
  },
  isProfileType( object ) {
    return this.checkForInstanceOfType( EDProfile.TYPE, object );
  },
  isFan( object ) {
    return this.checkForInstanceOfType( EDFan.TYPE, object );
  },
  isArtist( object ) {
    return this.checkForInstanceOfType( EDArtist.TYPE, object );
  },
  isMediaType( object ) {
    return this.checkForInstanceOfType( EDMedia.TYPE, object );
  }
};
