/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDLRUCache", function() {
    var EDLRUCache, EDArtist;

    suiteSetup( function( done ) {
      System.import( "domain/ed/storage/EDLRUCache" )
        .then( function( imported ) {
          EDLRUCache = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDLRUCache' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });

      System.import( "domain/ed/objects/EDArtist" )
        .then( function( imported ) {
          EDArtist = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDLRUCache' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDLRUCache creation", function() {
      test( "instance has expected properties & methods", function() {
        var edCache = new EDLRUCache( 10 );

        expect( edCache )
          .to.have.property( "observe" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "unobserve" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "set" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "get" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "peek" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "has" )
          .to.be.a( "function" );

        expect( edCache )
          .to.have.property( "remove" )
          .to.be.a( "function" );
      });
    });

    suite( "Class Methods", function() {
      test( "observe method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          acceptList = [ "set", "remove" ],
          observeCbSpy = sinon.spy(),
          observeSpy = sinon.spy( edCache, "observe" );

        edCache.observe( edArtist, observeCbSpy, acceptList );

        expect( observeSpy )
          .to.have.callCount( 1 );

        observeSpy.restore();
      });

      test( "unobserve method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          unobserveCbSpy = sinon.spy(),
          unobserveSpy = sinon.spy( edCache, "unobserve" );

        edCache.unobserve( edArtist, unobserveCbSpy );

        expect( unobserveSpy )
          .to.have.callCount( 1 );

        unobserveSpy.restore();
      });

      test( "set method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          setSpy = sinon.spy( edCache, "set" );

        edCache.set( edArtist );

        expect( setSpy )
          .to.have.callCount( 1 );

        setSpy.restore();
      });

      test( "get method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          getSpy = sinon.spy( edCache, "get" );

        edCache.get( edArtist );

        expect( getSpy )
          .to.have.callCount( 1 );

        getSpy.restore();
      });

      test( "peek method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          peekSpy = sinon.spy( edCache, "peek" );

        edCache.peek( edArtist );

        expect( peekSpy )
          .to.have.callCount( 1 );

        peekSpy.restore();
      });

      test( "has method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          hasSpy = sinon.spy( edCache, "has" );

        edCache.has( edArtist );

        expect( hasSpy )
          .to.have.callCount( 1 );

        hasSpy.restore();
      });

      test( "remove method", function() {
        var artistObj = {
            id: "001",
            yearFounded: 2009
          },
          edCache = new EDLRUCache( 10 ),
          edArtist = new EDArtist( artistObj ),
          removeSpy = sinon.spy( edCache, "remove" );

        edCache.remove( edArtist );

        expect( removeSpy )
          .to.have.callCount( 1 );

        removeSpy.restore();
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
