/*eslint-env mocha */
/*jscs:disable maximumLineLength*/
( function( window, document, polymer, sinon, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "file-drop-test-wrapper" ) ||
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

  suite( "<file-drop>", function() {
    suite( "Life Cycle", function() {
      teardown( function() {
        resetWrapper();
      });

      test( "ready: can create from document.createElement", function() {
        var createdSpy = sinon.spy(
          polymer.getRegisteredPrototype( "file-drop" ),
          "ready"
        );

        expect( document.createElement( "file-drop" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<file-drop></file-drop>" );

        expect( createdSpy ).to.have.callCount( 1 );
        createdSpy.restore();
      });

      test( "attached: can be added to another DOM Element", function() {
        var newElement = document.createElement( "file-drop" ),
          attachedSpy = sinon.spy( newElement, "attached" );

        testingWrapper.appendChild( newElement );

        expect( attachedSpy ).to.have.callCount( 1 );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<file-drop></file-drop>" );

        attachedSpy.restore();
      });

      test( "detached: can be removed from another DOM element", function() {
        var newElement = document.createElement( "file-drop" ),
          detachedSpy = sinon.spy( newElement, "detached" );

        testingWrapper.appendChild( newElement );
        testingWrapper.removeChild( newElement );

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
