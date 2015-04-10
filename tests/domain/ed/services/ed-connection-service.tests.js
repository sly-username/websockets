/*eslint-env mocha*/
/*global suite, test, console*/
(function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "edConnectionService", function() {
    var edConnectionService;

    suiteSetup(function( done ) {
      System.import( "domain/ed/services/ed-connection-service" )
        .then( function( imported ) {
          edConnectionService = imported.default;
          done();
        }, function( error ) {
          console.warn( "Could not import 'edConnectionService' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        }
      );
    });

    // Start Testing
    suite( "edConnectionService creation", function() {
      test( "edConnectionService have appropriate properties", function() {
        expect( edConnectionService.send )
          .to.be.an( "function" );

        expect( edConnectionService.request )
          .to.be.an( "function" );

        expect( edConnectionService.formattedSend )
          .to.be.a( "function" );

        expect( edConnectionService.formattedRequest )
          .to.be.a( "function" );
      });
    });

    suite.skip( "send method", function() {
      test( "calls the send method on the edWebSocket instance", function( done ) {
        var dataObj = {
            auth: {
              email: "intdev@eardish.com",
              password: "intdevpass"
            }
          },
          sendSpy = sinon.spy( edConnectionService, "send" );

        edConnectionService.send( "user/login", 10, dataObj );

        expect( sendSpy )
          .to.have.callCount( 1 );

        sendSpy.restore();
        done();
      });
    });

    suite.skip( "request method", function() {
      this.timeout( 5000 );

      test( "calls the request method on the edWebSocket instance", function( done ) {
        var dataObj = {
            action: {
              route: "profile/get",
              priority: 10
            },
            data: {
              id: "0"
            }
          },
          requestSpy = sinon.spy( edConnectionService, "formattedRequest" );

        edConnectionService.formattedRequest( dataObj )
          .then(function( resp ) {
            console.log( resp );
            done();
          });

        expect( requestSpy )
          .to.have.callCount( 1 );

        requestSpy.restore();
      });
    });

    suite.skip( "formattedSend method", function() {
      test( "calls the send method with formatted data", function( done ) {
        var dataObj = {
            id: "001",
            name: "string"
          },
          formattedSendSpy = sinon.spy( edConnectionService, "formattedSend" );

        edConnectionService.formattedSend( dataObj );

        expect( formattedSendSpy )
          .to.have.callCount( 1 );

        formattedSendSpy.restore();
        done();
      });
    });

    suite.skip( "formattedRequest method", function() {
      test( "calls the request method with formatted data", function( done ) {
        var dataObj = {
            id: "001",
            name: "string"
          },
          formattedSendSpy = sinon.spy( edConnectionService, "formattedSend" );

        edConnectionService.formattedSend( dataObj );

        expect( formattedSendSpy )
          .to.have.callCount( 1 );

        formattedSendSpy.restore();
        done();
      });
    });

    suite.skip( "formatDataObject method", function() {
      test( "method invocation", function() {
        var dataObj = {
            id: "001",
            name: "string"
          },
          formatDataObjectSpy = sinon.spy( edConnectionService, "formatDataObject" );

        edConnectionService.formatDataObject( dataObj );

        expect( formatDataObjectSpy )
          .to.have.callCount( 1 );

        formatDataObjectSpy.restore();
      });

      test( "returns a stringified json object", function() {
        var dataObj = {
            id: "001",
            name: "string"
          };

        expect( edConnectionService.formatDataObject( dataObj ) )
          .to.be.a( "string" );
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );
