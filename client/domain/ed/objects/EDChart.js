/*jshint strict: false*/

import define from "domain/ed/define-properties";

import EDModel from "domain/ed/objects/EDModel";

import EDProfile from "domain/ed/objects/profile/EDProfile";
import EDFan from "domain/ed/objects/profile/EDFan";
import EDArtist from "domain/ed/objects/profile/EDArtist";

import EDCollection from "domain/ed/storage/EDCollection";

var profileTypeForChartName = function( chartName ) {
  if ( ( /fan$/ ).test( chartName ) ) {
    return EDFan.MODEL_TYPE;
  } else if ( ( /artist$/ ).test( chartName ) ) {
    return EDArtist.MODEL_TYPE;
  }

  return EDProfile.MODEL_TYPE;
};

export default class EDChart extends EDModel {
  static get MODEL_TYPE() {
    return "chart";
  }

  constructor( args ) {
    var argsCopy = Object.assign({}, args );

    super( args );

    if ( args.dateEnds ) {
      argsCopy.dateEnds = new Date( args.dateEnds );
    }

    define.enumReadOnly( this, [
      "chartName",
      "dateEnds"
    ], argsCopy );

    define.enumReadOnlyDeep( this, [ "leaderboard" ], args );

    this.leaderboardCollection = new EDCollection(
      profileTypeForChartName( args.chartName ),
      args.leaderboard.map( value => value.profileId )
    );
  }

  getRankForId( profileId ) {
    for ( let i = 0 ; i < this.leaderboard.length ; i++ ) {
      if ( this.leaderboard[ i ].profileId === profileId ) {
        return this.leaderboard[ i ].num;
      }
    }

    return -1;
  }
}
