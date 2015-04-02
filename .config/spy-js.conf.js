"use strict";
module.exports = function( $ ) {
//  $.root = "http://localhost:5115";

  $.mapper = function( url ) {
    if ( url.indexOf( "vendor" ) >= 0 ) {
      return {
        instrument: false
      };
    }

    if ( url.indexOf( "coverage" ) >= 0 ) {
      return {
        instrument: false
      };
    }

    if ( url.indexOf( "livereload" ) >= 0 ) {
      return {
        instrument: false
      };
    }

    return {
      instrument: {
        prettify: false,
        objectDump: {
          depth: 1,
          propertyNumber: 3,
          arrayLength: 3,
          stringLength: 50
        }
      }
    };
  };

  $.eventFilter = {
    globalScope: false,
    timeout: true,
    interval: true,
    noEvents: []
  };
};
