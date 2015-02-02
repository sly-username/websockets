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
      // Testing for Size
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
      // Testing for disabled
      suite( "disabled", function() {
        test( "has default value: false", function() {
          // Check default setup
          expect( document.createElement( "select-box" ) )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via \"setAttribute\"", function() {
          var selectBox = document.createElement( "select-box" );

          // Set to be disabled
          selectBox.setAttribute( "disabled", "" );
          expect( selectBox.hasAttribute( "disabled" ) ).to.equal( true );
          expect( selectBox.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equal( "" );
        });

        test( "can be set via property \"disabled\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.disabled = true;
          expect( selectBox )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via attribute reflects to property", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "disabled", "" );
          expect( selectBox )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via property reflects to attribute", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.disabled = true;
          expect( selectBox.hasAttribute( "disabled" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );
        });

        test( "removing attribute reflects to attribute", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "disabled", "" );
          expect( selectBox.hasAttribute( "disabled" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );

          selectBox.removeAttribute( "disabled" );
          expect( selectBox )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "setting property to false removes attribute", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.disabled = true;
          expect( selectBox )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );

          expect( selectBox.hasAttribute( "disabled" ) )
            .to.be.a( "boolean" )
            .that.equals( true );

          selectBox.disabled = false;
          expect( selectBox )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );

          expect( selectBox.hasAttribute( "disabled" ) )
            .to.be.a( "boolean" )
            .and.to.equal( false );
        });

        test( "should not be able to input value with disable tag present", function() {
          // selectBox is defined as firstInput requires selectBox and is used twice
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "disabled", "" );
          selectBox.selectedIndex = 5;

          expect( selectBox )
            .to.have.property( "selectedIndex" )
            .to.be.null();
        });
      });
      // Testing for required
      suite( "required", function() {
        test( "can be set via attribute", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "required", "" );

          expect( selectBox.hasAttribute( "required" ) ).to.equal( true );
          expect( selectBox.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( selectBox )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<select-box required=\"\"></select-box>" );
        });

        test( "can be removed via attribute", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.setAttribute( "required", "" );
          selectBox.removeAttribute( "required" );

          expect( selectBox )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<select-box></select-box>" );
        });
      });
      // Testing for selectedIndex
      suite( "selectedIndex", function() {
        test( "can be set via property \"selectedIndex\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.selectedIndex = 5;

          expect( selectBox )
            .to.have.property( "selectedIndex" )
            .that.is.a( "number" )
            .that.equals( 5 );
        });
      });
      // Testing for value, default for 2 is "pears"
      suite( "value", function() {
        test( "can get value via property \"selectedIndex\"", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.selectedIndex = 2;

          expect( selectBox )
            .to.have.property( "value" )
            .that.is.a( "string" )
            .that.equals( "pears" );
        });

        test( "value is a getter only", function() {
          var selectBox = document.createElement( "select-box" );

          selectBox.selectedIndex = 2;
          selectBox.value = "pie";

          expect( selectBox )
            .to.have.property( "value" )
            .that.is.a( "string" )
            .that.equals( "pears" );
        });
      });
    });
  });
})( window, document, window.chai );
