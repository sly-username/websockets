/*jshint strict: false*/

import define from "domain/ed/define-properties";

import EDModel from "domain/ed/objects/EDModel";

import EDProfile from "domain/ed/objects/profile/EDProfile";
import EDFan from "domain/ed/objects/profile/EDFan";
import EDArtist from "domain/ed/objects/profile/EDArtist";
import EDTrack from "domain/ed/objects/media/EDTrack";

import EDCollection from "domain/ed/storage/EDCollection";

var profileTypeForChartName = function( chartName ) {
  if ( ( /fan$/ ).test( chartName ) ) {
    return EDFan.MODEL_TYPE;
  } else if ( ( /artist$/ ).test( chartName ) ) {
    return EDArtist.MODEL_TYPE;
  } else if ( ( /track$/ ).test( chartName ) ) {
    return EDTrack.MODEL_TYPE;
  }
  return EDProfile.MODEL_TYPE;
};

export default class EDChart extends EDModel {
  static get MODEL_TYPE() {
    return "chart";
  }

  constructor( args ) {
    var argsCopy = Object.assign({}, args );
    args.id = null;
    args.type = null;
    super( args );

    // todo won't let me add another property
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
      args.leaderboard.map( value => value.id )
    );
  }

  get timeRemaining() {
    var
      end = new Date( this.dateEnds ),
      current = new Date(),
      timeLeft = end - current,
      _seconds = 1000,
      _minutes = _seconds * 60,
      _hours = _minutes * 60,
      _days = _hours * 24,
      daysLeft = Math.floor( timeLeft / _days ),
      hoursLeft = Math.floor( timeLeft % _days / _hours ),
      minutesLeft = Math.floor( timeLeft % _hours / _minutes );

    return `${daysLeft}d ${hoursLeft}h ${minutesLeft}m`;
  }

  getRankForId( id ) {
    console.log( this.leaderboard );
    for ( let i = 0 ; i < this.leaderboard.length ; i++ ) {
      if ( this.leaderboard[ i ].id === id ) {
        return this.leaderboard[ i ].value;
      }
    }

    return -1;
  }
}
