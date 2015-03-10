/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "LRUCache", function() {
    var LRUCache;

    suiteSetup( function( done ) {
      System.import( "domain/lib/storage/LRUCache" )
        .then( function( imported ) {
          LRUCache = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'LRUCache' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });
    // Start Test
    suite( "LRUCache creation", function() {
      test( "starts with appropriate properties", function() {
        var cache = new LRUCache( 10 );

        expect( cache )
          .to.have.property( "limit" )
          .to.be.a( "number" )
          .that.equals( 10 );
        expect( cache )
          .to.have.property( "size" )
          .to.be.a( "number" )
          .that.equals( 0 );
      });
    });
    suite( "LRUCache Properties", function() {
      test( "Setting for initial object", function() {
        var cache = new LRUCache( 10 ),
          keyMap = Object.getOwnPropertySymbols( cache )[0];
        cache.set( "A", 1 );
        expect( cache[ keyMap ].A )
          .to.have.property( "key" )
          .to.be.a( "string" )
          .that.equals( "A" );
        expect( cache[ keyMap ].A )
          .to.have.property( "data" )
          .to.be.a( "number" )
          .that.equals( 1 );
        expect( cache[ keyMap ].A )
          .to.have.property( "newer" )
          .and.equals( null );
        expect( cache[ keyMap ].A )
          .to.have.property( "older" )
          .and.equals( null );
      });
      test( "Setting for non-initial object", function() {
        var cache = new LRUCache( 10 ),
          keyMap = Object.getOwnPropertySymbols( cache )[0];
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        expect( cache[ keyMap ].B )
          .to.have.property( "key" )
          .to.be.a( "string" )
          .that.equals( "B" );
        expect( cache[ keyMap ].B )
          .to.have.property( "data" )
          .to.be.a( "number" )
          .that.equals( 2 );
        expect( cache[ keyMap ].B )
          .to.have.property( "newer" )
          .and.equals( null );
        expect( cache[ keyMap ].B.older )
          .to.have.property( "key" )
          .to.be.a( "string" )
          .that.equals( "A" );
      });
      test( "Setting returns null when not at limit", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        expect( cache.set( "C", 3 ) ).to.be.equals( null );
      });
      test( "Get returns the object stored at the key", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.get( "B" ) )
          .to.be.a( "number" )
          .that.equals( 2 );
      });
      test( "Get moves the node to the tail of the cache", function() {
        var cache = new LRUCache( 10 ),
          keyMap = Object.getOwnPropertySymbols( cache )[0];
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        cache.get( "B" );
        expect( cache[ keyMap ].B.older )
          .to.have.property( "key" )
          .to.be.a( "string" )
          .that.equals( "C" );
      });
      test( "Peek", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.peek( "B" ) )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .and.equals( "B" );
      });
      test( "Has", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        expect( cache.has( "A" ) )
          .to.be.a( "boolean" )
          .that.equals( true );
      });
      test( "Shift", function() {
        var cache = new LRUCache( 10 ),
          keyMap = Object.getOwnPropertySymbols( cache )[0];
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.shift() )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .to.equal( "A" );
        cache.shift();
        expect( cache.has( "A" ) )
          .to.be.a( "boolean" )
          .that.equals( false );
      });
      test( "Remove", function() {
        var cache = new LRUCache( 10 );
        cache.set( "B", 2 );
        cache.remove( "B" );
        expect( cache.has( "B" ) )
          .to.be.a( "boolean" )
          .that.equals( false );
      });
      test( "Remove returns null if key is not in cache", function() {
        var cache = new LRUCache( 10 );
        cache.set( "B", 2 );
        expect( cache.remove( "C" ) ).to.be.equals( null );
      });
      test( "Remove returns the removed key", function() {
        var cache = new LRUCache( 10 );
        cache.set( "B", 2 );
        expect( cache.remove( "B" ) ).to.be.equals( 2 );
      });
      test( "Clear", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        cache.clear();
        expect( cache.keyMap ).to.be.empty;
      });
      test( "Keys returns an array of stored keys in the map", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.keys() )
          .to.be.an( "array" );
        // tests errors saying expected [ 'A', 'B', 'C' ] to equal [ 'A', 'B', 'C' ]
        // for the following commented out code
        //  .that.equals([ 'A', 'B', 'C' ]);
        expect( cache.keys()[0] )
          .to.be.a( "string" )
          .that.equals( "A" );
        expect( cache.keys()[1] )
          .to.be.a( "string" )
          .that.equals( "B" );
        expect( cache.keys()[2] )
          .to.be.a( "string" )
          .that.equals( "C" );
      });
      test( "ForEach", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        cache.forEach( function( key ) {
          cache.remove( key );
        });
        expect( cache.keyMap ).to.be.empty;
      });
      test( "ToJSON", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.toJSON()[0] )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .that.equals( "\"A\"" );
      });
      test( "ToString", function() {
        var cache = new LRUCache( 10 );
        cache.set( "A", 1 );
        cache.set( "B", 2 );
        cache.set( "C", 3 );
        expect( cache.toString() )
          .to.be.a( "string" )
          .that.equals( "A:1 < B:2 < C:3" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
