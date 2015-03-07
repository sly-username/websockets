/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "LRUCache", function() {
    var LRUCache;
    this.timeout( 5000 );

    suiteSetup( function( done ) {
      System.import( "domain/lib/LRUCache/LRUCache" )
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
          .to.have.property( "keyMap" )
          .to.be.an( "object" );
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
      test( "Put", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        expect( cache.keyMap.A )
          .to.have.property( "key" )
          .to.be.a( "string" )
          .that.equals( "A" );
        expect( cache.keyMap.A )
          .to.have.property( "value" )
          .to.be.a( "number" )
          .that.equals( 1 );
      });
      test( "Get", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.get( "B" ) )
          .to.be.a( "number" )
          .that.equals( 2 );
      });
      test( "Find", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.find( "B" ) )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .and.equals( "B" );
      });
      test( "Has", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        expect( cache.has( "A" ) )
          .to.be.a( "boolean" )
          .that.equals( true );
      });
      test( "Shift", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.shift() )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .to.equal( "A" );
        cache.shift();
        expect( cache.has( "A" ) )
          .to.be.a( "boolean" )
          .that.equals( false );
      });
      test( "Set", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.set( "A", 2 );
        expect( cache.keyMap.A )
          .to.have.property( "value" )
          .to.be.a( "number" )
          .that.equals( 2 );
      });
      test( "Remove", function() {
        var cache = new LRUCache( 10 );
        cache.put( "B", 2 );
        cache.remove( "B" );
        expect( cache.has( "B" ) )
          .to.be.a( "boolean" )
          .that.equals( false );
      });
      test( "Clear", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        cache.clear();
        expect( cache.keyMap ).to.be.empty;
      });
      test( "Keys", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.keys() )
          .to.be.an( "array" );
        expect( cache.keys()[0] )
          .to.be.a( "string" )
          .that.equals( "A" );
      });
      test( "ForEach", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        cache.forEach( function( key ) {
          cache.remove( key );
        });
        expect( cache.keyMap ).to.be.empty;
      });
      test( "ToJSON", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.toJSON()[0] )
          .to.be.an( "object" )
          .that.has.property( "key" )
          .that.equals( "\"A\"" );
      });
      test( "ToString", function() {
        var cache = new LRUCache( 10 );
        cache.put( "A", 1 );
        cache.put( "B", 2 );
        cache.put( "C", 3 );
        expect( cache.toString() )
          .to.be.a( "string" )
          .that.equals( "A:1 < B:2 < C:3" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
