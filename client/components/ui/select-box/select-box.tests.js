/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "select-box-test-wrapper" ) ||
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

  suite( "<select-box>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "select-box" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<select-box></select-box>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "select-box" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<select-box></select-box>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM Element", function() {
        var selectBox = document.createElement( "select-box" );

        testingWrapper.appendChild( selectBox );
        testingWrapper.removeChild( selectBox );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes", function() {
      suite( "Size", function() {
        test( "has default value", function() {
          expect( document.createElement( "select-box" ) )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "can be set via \"setAttribute\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "size", "8" );

          expect( selectBox.getAttribute( "size" ) )
            .that.is.a( "string" )
            .and.equals( "8" );
        });

        test( "can be set via property \"size\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.size = 10;

          expect( selectBox )
            .to.have.property( "size" )
            .that.equals( 10 );
        });

        test( "setting via \"setAttribute\" reflects to property \"size\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "size", "8" );

          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .that.equals( 8 );
        });

        test( "setting via property \"size\" reflects to attribute \"size\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.size = 8;

          expect( selectBox.hasAttribute( "size" ) ).to.equal( true );
          expect( selectBox.getAttribute( "size" ) )
            .to.be.a( "string" )
            .that.equals( "8" );
        });

        test( "removing attribute \"size\" sets property back to default value", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "size", "8" );
          expect( selectBox.hasAttribute( "size" ) ).to.equal( true );

          selectBox.removeAttribute( "size" );
          expect( selectBox.hasAttribute( "size" ) ).to.equal( false );

          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "setting \"size\" to null resets property to default value", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.size = 8;
          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 8 );

          selectBox.size = null;
          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "setting \"size\" to undefined resets property to default value", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.size = 8;
          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 8 );

          selectBox.size = undefined;
          expect( selectBox )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 8 );
        });
      });
    });
  });
})( window, document, window.chai );
