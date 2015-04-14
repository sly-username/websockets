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

window.EDModel = EDModel;
window.EDProfile = EDProfile;
window.EDFan = EDFan;
window.EDArtist = EDArtist;

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
    var classConstructor;

    if ( type in this.constructorMap ) {
      classConstructor = this.constructorMap[ type ];
    } else {
      throw new TypeError(
        `Checking against ${type} did not yield a constructor to check against.`
      );
    }

    if ( object instanceof EDModel ) {
      return object instanceof classConstructor;
    } else if ( !( "type" in object ) ) {
      throw new TypeError( "Object to check against did not have a property \"type\"." );
    }

    // otherwise we are checking against an arg ball
    while ( classConstructor !== Object ) {
      if ( object.type.indexOf( classConstructor.TYPE ) > -1 ) {
        return true;
      }

      classConstructor = Object.getPrototypeOf( classConstructor );
    }

    return false;

    return Object.keys( this.constructorMap )
      .map( type => this.constructorMap[ type ] )
      .some( classConstructor => {
        return classConstructor.TYPE === type;
      });
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
  isMediaType( object ) {
    return this.checkForInstanceOfType( EDMedia.TYPE, object );
  }
};
