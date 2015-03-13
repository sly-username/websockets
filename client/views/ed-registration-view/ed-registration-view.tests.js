/*eslint-env mocha */
/*jscs:disable maximumLineLength*/
( function( window, document, polymer, sinon, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "ed-registration-view-test-wrapper" ) ||
      ( function() {
        var wrapper = document.createElement( "div" );
        document.body.appendChild( wrapper );
        return wrapper;
      })(),
    // original state to test against
    originalWrapperOuterHTML = testingWrapper.outerHTML,
    // re-sets wrapper to blank
    resetWrapper = function() {
      testingWrapper.innerHTML = "";
    };

  suite( "<ed-registration-view>", function() {
    suite( "Life Cycle", function() {
      teardown( function() {
        resetWrapper();
      });

      test( "ready: can create from document.createElement", function() {
        var createdSpy = sinon.spy(
          polymer.getRegisteredPrototype( "ed-registration-view" ),
          "ready"
        );

        expect( document.createElement( "ed-registration-view" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-registration-view></ed-registration-view>" );

        expect( createdSpy ).to.have.callCount( 1 );
        createdSpy.restore();
      });

      test( "attached: can be added to another DOM Element", function() {
        var edRegister = document.createElement( "ed-registration-view" ),
          attachedSpy = sinon.spy( edRegister, "attached" );

        testingWrapper.appendChild( edRegister );

        expect( attachedSpy ).to.have.callCount( 1 );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-registration-view></ed-registration-view>" );

        attachedSpy.restore();
      });

      test( "detached: can be removed from another DOM element", function() {
        var edRegister = document.createElement( "ed-registration-view" ),
          detachedSpy = sinon.spy( edRegister, "detached" );

        testingWrapper.appendChild( edRegister );
        testingWrapper.removeChild( edRegister );

        expect( detachedSpy ).to.have.callCount( 1 );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        detachedSpy.restore();
      });
    });

    suite( "Attributes", function() {
      suite( "data-text", function() {
        test( "reflection", function() {});
      });
    });

    suite( "Events", function() {
      suite( "Event Name", function() {
        test( "customEvent", function( done ) {});
      });
    });
  });
})( window, document, window.Polymer, window.sinon, window.chai );
