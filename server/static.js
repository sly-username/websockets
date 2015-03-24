/*eslint strict: [ 2, "global"], no-sync: 0*/
"use strict";
var koa = require( "koa" ),
  send = require( "koa-send" ),
  fs = require( "fs" ),
  config = require( "../config.paths.js" ),
  dev,
  prod,
  serve;

/* jshint -W071 */
serve = function( root, fallback ) {
  return function* ( next ) {
    var stat;

    try {
      stat = fs.statSync( root + this.path );

      if ( stat.isDirectory() ) {
        throw new Error( "Won't serve directory" );
      }
      yield send( this, root + this.path );
    } catch ( e ) {
      console.log( "falling back for: " + this.path );
      yield send( this, fallback );
    }
  };
};

module.exports = {
  startDev: function() {
    dev = koa();
    dev.use( serve( config.dev, config.server.fallback.dev ) );
    return dev.listen( config.server.ports.dev );
  },
  startProd: function() {
    prod = koa();
    prod.use( serve( config.prod, config.server.fallback.prod ) );
    return prod.listen( config.server.ports.prod );
  }
};
