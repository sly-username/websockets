/*eslint-env mocha */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
      // get wrapper from document or for karma, create a new div and append it to the DOM
      testingWrapper = document.getElementById( "progress-bar-test-wrapper" ) ||
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

  suite( "<progress-bar>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "progress-bar" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<progress-bar></progress-bar>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "progress-bar" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<progress-bar></progress-bar>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var newElement = document.createElement( "progress-bar" );

        testingWrapper.appendChild( newElement );
        testingWrapper.removeChild( newElement );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      suite( "Value", function() {
        test( "has default value: 0", function() {
          expect( document.createElement( "progress-bar" ) )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "can be set via \"setAttribute\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "value", "5" );

          expect( bar.hasAttribute( "value" ) ).to.equal( true );

          expect( bar.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( "5" );

          expect( bar )
            .to.have.property( "outerHTML" )
            .that.equals( "<progress-bar value=\"5\"></progress-bar>" );
        });

        test( "can be set via property \"value\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.value = 5;

          expect( bar )
            .to.have.property( "value" )
            .that.equals( 5 );
        });

        test( "setting via \"setAttribute\" reflects to property \"value\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "value", "5" );

          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "setting via property \"value\" reflects to attribute \"value\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.value = 5;

          expect( bar.hasAttribute( "value" ) ).to.equal( true );
          expect( bar.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( "5" )
            .and.equal( bar.value.toString() );
        });

        test( "removing attribute \"value\" sets property back to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "value", "5" );
          expect( bar.hasAttribute( "value" ) ).to.equal( true );

          bar.removeAttribute( "value" );
          expect( bar.hasAttribute( "value" ) ).to.equal( false );

          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"value\" to null resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.value = 5;
          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 5 );

          bar.value = null;
          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"value\" to undefined resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.value = 5;
          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 5 );

          bar.value = undefined;
          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });
      });

      suite( "Max", function() {
        test( "has default value: 1", function() {
          expect( document.createElement( "progress-bar" ) )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 1 );
        });

        test( "can be set via \"setAttribute\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "max", "5" );

          expect( bar.hasAttribute( "max" ) ).to.equal( true );

          expect( bar.getAttribute( "max" ) )
            .to.be.a( "string" )
            .that.equals( "5" );

          expect( bar )
            .to.have.property( "outerHTML" )
            .that.equals( "<progress-bar max=\"5\"></progress-bar>" );
        });

        test( "can be set via property \"max\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.max = 5;

          expect( bar )
            .to.have.property( "max" )
            .that.equals( 5 );
        });

        test( "setting via \"setAttribute\" reflects to property \"max\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "max", "5" );

          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "setting via property \"max\" reflects to attribute \"max\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.max = 5;

          expect( bar.hasAttribute( "max" ) ).to.equal( true );
          expect( bar.getAttribute( "max" ) )
            .to.be.a( "string" )
            .that.equals( "5" )
            .and.equal( bar.max.toString() );
        });

        test( "removing attribute \"max\" sets property back to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "max", "5" );
          expect( bar.hasAttribute( "max" ) ).to.equal( true );

          bar.removeAttribute( "max" );
          expect( bar.hasAttribute( "max" ) ).to.equal( false );

          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"max\" to null resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.max = 5;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 5 );

          bar.max = null;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"max\" to undefined resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.max = 5;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 5 );

          bar.max = undefined;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });
      });

    });
  });
})( window, document, window.chai );
