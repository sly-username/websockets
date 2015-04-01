/*eslint-env mocha*/
/*global suite, test, console*/
(function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDGenre", function() {
    var EDGenre;

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDGenre" )
        .then( function( imported ) {
          EDGenre = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDGenre' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "EDGenre creation", function() {
      test( "constructor has expected properties", function() {
        var genreObj = {
            id: "001",
            type: "genre",
            name: "Pop"
          },
          genre = new EDGenre( genreObj );

        expect( genre )
          .to.have.property( "id" );

        expect( genre )
          .to.have.property( "type" );

        expect( genre )
          .to.have.property( "name" );

      });
    });

    suite( "Property type checks", function() {
      test( "id is correct type", function() {
        var genreObj = {
            id: "001",
            type: "genre",
            name: "Pop"
          },
          genre = new EDGenre( genreObj );

        expect( genre.id )
          .to.be.a( "string" )
          .to.equal( "001" );

      });

      test( "object type should equal 'genre'", function() {
        var genreObj = {
            id: "001",
            type: "genre",
            name: "Pop"
          },
          genre = new EDGenre( genreObj );

        expect( genre.type )
          .to.be.a( "string" )
          .to.equal( "genre" );

      });

      test( "name should equal genre name", function() {
        var genreObj = {
            id: "001",
            type: "genre",
            name: "Pop"
          },
          genre = new EDGenre( genreObj );

        expect( genre.name )
          .to.be.a( "string" )
          .to.equal( "Pop" );

      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
