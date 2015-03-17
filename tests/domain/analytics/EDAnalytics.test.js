/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "EDAnalytics", function() {
    var EDAnalytics;

    suiteSetup( function( done ) {
      System.import( "domain/analytics/EDAnalytics" )
        .then( function( imported ) {

          EDAnalytics = imported.default;
          done();

        }, function( error ) {
          console.warn( "Could not import 'EDAnalytics' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        }
      );
    });

    // Start Testing
    suite( "EDAnalytics creation", function() {
      test("starts with appropiate properties", function( ){

        expect( EDAnalytics.commonBlock )
          .to.be.an( "object" );

        expect( EDAnalytics.deviceBlock )
          .to.be.an( "object" );

        expect( EDAnalytics.sessionBlock )
          .to.be.an( "object" );

        expect( EDAnalytics.locationBlock )
          .to.be.an( "object" );

        expect( EDAnalytics.version )
          .to.be.an( "string" );

        expect( EDAnalytics.time )
          .to.be.an( "string" );

        expect( EDAnalytics.user )
          .to.be.an( "number" );

        expect( EDAnalytics.route )
          .to.be.an( "string" );

      });

      test("initiates the common block", function(){
        //var initEvent = sinon.spy(EDAnalytics, "commonBlock" );
        //sinon.stub( EDAnalytics, "commonBlock" );

        expect( EDAnalytics[ "commonBlock" ] )
          .to.exist;

        //initEvent.restore();
      });
    });



    suite( "send method", function() {
      test( "calls the send method", function() {

        var edEvent = {
            "type": "play",
            "eventBlock": {}
          },
          sendStub;

        sendStub = sinon.spy( EDAnalytics, "send" );
        EDAnalytics.send( edEvent );

        expect( sendStub )
          .to.have.callCount( 1 );

        sendStub.restore();
      });

    });

    suite( "createEvent method", function() {
      test( "calls on the send method", function() {

      });

    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
