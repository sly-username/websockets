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
          expect( bar.hasAttribute( "value" ) ).to.equal( true );

          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test.skip( "setting \"value\" to null resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          console.log( "setting to 5" );
          bar.value = 5;
          console.log( "set to 5" );

          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 5 );

          console.log( "setting to null" );
          bar.value = null;
          console.log( "been set to null" );

          expect( bar )
            .to.have.property( "value" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test.skip( "setting \"value\" to undefined resets property to default value", function() {
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
          expect( bar.hasAttribute( "max" ) ).to.equal( true );

          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 1 );
        });

        test.skip( "setting \"max\" to null resets property to default value", function() {
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
            .and.equals( 1 );
        });

        test.skip( "setting \"max\" to undefined resets property to default value", function() {
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
            .and.equals( 1 );
        });

        test.skip( "setting \"max\" to less than 1 resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.max = 5;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 5 );

          bar.max = -12;
          expect( bar )
            .to.have.property( "max" )
            .that.is.a( "number" )
            .and.equals( 1 );
        });
      });

      suite( "animation", function() {
        test( "can be set via \"setAttribute\"", function() {
          var bar = document.createElement( "progress-bar" ),
              setTo = "Set via Attribute";

          bar.setAttribute( "animation", setTo );

          expect( bar.hasAttribute( "animation" ) ).to.equal( true );

          expect( bar.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( bar )
            .to.have.property( "outerHTML" )
            .that.equals( "<progress-bar animation=\"" + setTo + "\"></progress-bar>" );
        });

        test( "can be set via property \"animation\"", function() {
          var bar = document.createElement( "progress-bar" ),
              setTo = "Set via Property";

          bar.animation = setTo;

          expect( bar )
            .to.have.property( "animation" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"animation\"", function() {
          var bar = document.createElement( "progress-bar" ),
              setTo = "Set via Attribute";

          bar.setAttribute( "animation", setTo );

          expect( bar )
            .to.have.property( "animation" )
            .that.equals( setTo )
            .and.equals( bar.getAttribute( "animation" ) );
        });

        test( "setting via property \"animation\" reflects to attribute \"animation\"", function() {
          var bar = document.createElement( "progress-bar" ),
              setTo = "Set via Property";

          bar.animation = setTo;

          expect( bar.hasAttribute( "animation" ) ).to.equal( true );
          expect( bar.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( bar.animation );
        });
      });

      suite( "Direction", function() {
        test( "has default value: RTL", function() {
          expect( document.createElement( "progress-bar" ) )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );
        });

        test( "can be set via \"setAttribute\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "direction", "LTR" );

          expect( bar.hasAttribute( "direction" ) ).to.equal( true );

          expect( bar.getAttribute( "direction" ) )
            .to.be.a( "string" )
            .that.equals( "LTR" );

          expect( bar )
            .to.have.property( "outerHTML" )
            .that.equals( "<progress-bar direction=\"LTR\"></progress-bar>" );
        });

        test( "can be set via property \"direction\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.direction = "LTR";

          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "LTR" );
        });

        test( "setting via \"setAttribute\" reflects to property \"direction\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "direction", "LTR" );

          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "LTR" );
        });

        test( "setting via property \"max\" reflects to attribute \"direction\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.direction = "LTR";

          expect( bar.hasAttribute( "direction" ) ).to.equal( true );
          expect( bar.getAttribute( "direction" ) )
            .to.be.a( "string" )
            .that.equals( "LTR" )
            .and.equal( bar.direction );
        });

        test( "removing attribute \"direction\" sets property back to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "direction", "LTR" );
          expect( bar.hasAttribute( "direction" ) ).to.equal( true );

          bar.removeAttribute( "direction" );
          expect( bar.hasAttribute( "direction" ) ).to.equal( false );

          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );
        });

        test( "setting \"direction\" to null resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.direction = "LTR";
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "LTR" );

          bar.direction = null;
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );
        });

        test( "setting \"direction\" to undefined resets property to default value", function() {
          var bar = document.createElement( "progress-bar" );

          bar.direction = "LTR";
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "LTR" );

          bar.direction = undefined;
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );
        });

        test( "setting \"direction\" to other than RTL or LTR sets to default", function() {
          var bar = document.createElement( "progress-bar" );

          bar.direction = "pie";
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );

          bar.direction = -12;
          expect( bar )
            .to.have.property( "direction" )
            .that.is.a( "string" )
            .and.equals( "RTL" );
        });
      });

      suite( "Show-value", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "progress-bar" ) )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via \"setAttribute\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "show-value", "" );
          expect( bar.hasAttribute( "show-value" ) ).to.equal( true );
          expect( bar.getAttribute( "show-value" ) )
            .to.be.a( "string" )
            .and.equal( "" );
        });

        test( "can be set via property \"show-value\"", function() {
          var bar = document.createElement( "progress-bar" );

          bar.showValue = true;
          expect( bar )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via attribute reflects to property", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "show-value", "" );
          expect( bar )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via property reflects to attribute", function() {
          var bar = document.createElement( "progress-bar" );

          bar.showValue = true;
          expect( bar.hasAttribute( "show-value" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );
        });

        // remove attribute sets to false
        test( "removing attribute reflects to attribute", function() {
          var bar = document.createElement( "progress-bar" );

          bar.setAttribute( "show-value", "" );
          expect( bar.hasAttribute( "show-value" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );

          bar.removeAttribute( "show-value" );
          expect( bar )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "setting property to false removes attribute", function() {
          var bar = document.createElement( "progress-bar" );

          bar.showValue = true;
          expect( bar )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( true );

          expect( bar.hasAttribute( "show-value" ) )
            .to.be.a( "boolean" )
            .that.equals( true );

          bar.showValue = false;
          expect( bar )
            .to.have.property( "showValue" )
            .that.is.a( "boolean" )
            .and.equals( false );

          expect( bar.hasAttribute( "show-value" ) )
            .to.be.a( "boolean" )
            .and.to.equal( false );
        });
      });
    });
  });
})( window, document, window.chai );
