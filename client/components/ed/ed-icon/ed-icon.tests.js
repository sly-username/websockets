/*eslint-env mocha */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "ed-icon-test-wrapper" ) ||
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

  suite( "<ed-icon>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "ed-icon" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-icon></ed-icon>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        var edIcon = document.createElement( "ed-icon" );

        testingWrapper.appendChild( edIcon );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-icon></ed-icon>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var edIcon = document.createElement( "ed-icon" );

        testingWrapper.appendChild( edIcon );
        testingWrapper.removeChild( edIcon );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      // Tests for Name attribute and property
      suite( "name", function() {
        test( "can be set via setattribute", function() {
          var edIcon = document.createElement( "ed-icon" ),
              setTo = "Set via Attribute";

          edIcon.setAttribute( "name", setTo );

          expect( edIcon.hasAttribute( "name" ) ).to.equal( true );

          expect( edIcon.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( edIcon )
            .to.have.property( "outerHTML" )
            .that.equals( "<ed-icon name=\"" + setTo + "\"></ed-icon>" );
        });

        test( "can be set via property \"name\"", function() {
          var edIcon = document.createElement( "ed-icon" ),
              setTo = "Set via Property";

          edIcon.name = setTo;

          expect( edIcon )
            .to.have.property( "name" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"name\"", function() {
          var edIcon = document.createElement( "ed-icon" ),
              setTo = "Set via Attribute";

          edIcon.setAttribute( "name", setTo );

          expect( edIcon )
            .to.have.property( "name" )
            .that.equals( setTo )
            .and.equals( edIcon.getAttribute( "name" ) );
        });

        test( "setting via property \"name\" reflects to attribute \"name\"", function() {
          var edIcon = document.createElement( "ed-icon" ),
              setTo = "Set via Property";

          edIcon.name = setTo;

          expect( edIcon.hasAttribute( "name" ) ).to.equal( true );
          expect( edIcon.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( edIcon.name );
        });
      });

      // Tests for rotation
      suite( "rotation", function() {
        test( "has default value: \"0\"", function() {
          expect( document.createElement( "ed-icon" ) )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "can be set via setattribute", function() {
          var edIcon = document.createElement( "ed-icon" ),
              setTo = "90";

          edIcon.setAttribute( "rotation", setTo );

          expect( edIcon.hasAttribute( "rotation" ) ).to.equal( true );

          expect( edIcon.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( edIcon )
            .to.have.property( "outerHTML" )
            .that.equals( "<ed-icon rotation=\"" + setTo + "\"></ed-icon>" );
        });

        test( "can be set via property \"rotation\"", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.rotation = 180;

          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 180 );
        });

        test( "setting via \"setAttribute\" reflects to property \"rotation\"", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.setAttribute( "rotation", "90" );

          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 90 );
        });

        test( "setting via property \"rotation\" reflects to attribute \"rotation\"", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.rotation = 90;

          expect( edIcon.hasAttribute( "rotation" ) ).to.equal( true );
          expect( edIcon.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( "90" )
            .and.equal( edIcon.rotation.toString() );
        });

        test( "defaults to 0 if invalid when set via property", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.rotation = 999999;

          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equal( 0 );
        });

        test( "defaults to 0 if invalid when set via attribute", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.setAttribute( "rotation", "pie" );

          expect( edIcon.hasAttribute( "rotation" ) ).to.equal( true );
          expect( edIcon.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( "0" )
            .and.equal( edIcon.rotation.toString() );
        });

        test( "removing attribute \"rotation\" sets property back to default value", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.setAttribute( "rotation", "90" );
          expect( edIcon.hasAttribute( "rotation" ) ).to.equal( true );

          edIcon.removeAttribute( "rotation" );
          expect( edIcon.hasAttribute( "rotation" ) ).to.equal( false );

          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"rotation\" to null resets property to default value", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.rotation = 90;
          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 90 );

          edIcon.rotation = null;
          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });

        test( "setting \"rotation\" to undefined resets property to default value", function() {
          var edIcon = document.createElement( "ed-icon" );

          edIcon.rotation = 90;
          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 0 );

          edIcon.rotation = undefined;
          expect( edIcon )
            .to.have.property( "rotation" )
            .that.is.a( "number" )
            .and.equals( 0 );
        });
      });
    });
  });
})( window, document, window.chai );
