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
  } else if ( ( /track$/ ).test( chartName ) ) {
    return EDChart.MODEL_TYPE;
  }
  return EDProfile.MODEL_TYPE;
};

export default class EDChart extends EDModel {
  static get MODEL_TYPE() {
    return "chart";
  }

  constructor( args ) {
    var argsCopy = Object.assign({}, args );
    argsCopy.id = null;
    argsCopy.type = null;
    super( argsCopy );

    //if ( args.data.dateEnds ) {
    //  argsCopy.dateEnds = new Date( args.data.dateEnds );
    //}
    var dateThing = new Date( args.data.dateEnds );
    console.log( dateThing );

    define.enumReadOnly( this, [
      "chartName",
      "dateEnds"
    ], argsCopy );

    define.enumReadOnlyDeep( this, [ "leaderboard" ], args );
    console.log( args );

    this.leaderboardCollection = new EDCollection(
      profileTypeForChartName( args.data.chartName ),
      args.data.leaderboard.map( value => value.id || value.profileId )
      // todo remove profileId
    );
  }

  get timeRemaining() {
    var end = new Date( this.raw.data.dateEnds ),
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

  getRankForId( profileId ) {
    console.log( "chartlist", this.chartlist );
    console.log( this.args );
    //for ( let i = 0 ; i < this.chartList.data.leaderboard.length ; i++ ) {
    //  if ( this.chartList.data.leaderboard.profileId === profileId ) {
    //    return this.chartList.data.leaderboard[ i ].num;
    //  }
    //}

    return -1;
  }
}
