( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDFan", function() {
    var EDFan;

    this.timeout( 5000 );

    suiteSetup( function( done ) {
      System.import( "domain/ed/objects/EDFan" )
        .then( function( imported ) {
          EDFan = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'EDFan' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    suite( "Properties", function() {
      test( "EDProfile should have the following properties: 'birthday', 'name'",
        function() {
          var args = {},
            edFan = new EDFan( args );

          expect( edFan )
            .to.have.property( "birthday" );

          expect( edFan )
            .to.have.property( "name" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
