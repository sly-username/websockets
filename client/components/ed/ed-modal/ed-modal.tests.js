/*eslint-env mocha */
/*eslint-env mocha */
/* Line 40 in the js.file is causing the tests to duplicate and fail */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "ed-modal-test-wrapper" ) ||
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

  suite( "<ed-modal>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "ed-modal" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-modal></ed-modal>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "ed-modal" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<ed-modal></ed-modal>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var edModal = document.createElement( "ed-modal" );

        testingWrapper.appendChild( edModal );
        testingWrapper.removeChild( edModal );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      suite( "trigger", function() {
        test( "can be set via \"setAttribute\"", function() {
          var edModal = document.createElement( "ed-modal" ),
              setTo = "Set via Attribute";

          edModal.setAttribute( "trigger", setTo );

          expect( edModal.hasAttribute( "trigger" ) ).to.equal( true );

          expect( edModal.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( edModal )
            .to.have.property( "outerHTML" )
            .that.equals( "<ed-modal trigger=\"" + setTo + "\"></ed-modal>" );
        });

        test( "can be set via property \"trigger\"", function() {
          var edModal = document.createElement( "ed-modal" ),
              setTo = "Set via Property";

          edModal.trigger = setTo;

          expect( edModal )
            .to.have.property( "trigger" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"trigger\"", function() {
          var edModal = document.createElement( "ed-modal" ),
              setTo = "Set via Attribute";

          edModal.setAttribute( "trigger", setTo );

          expect( edModal )
            .to.have.property( "trigger" )
            .that.equals( setTo )
            .and.equals( edModal.getAttribute( "trigger" ) );
        });

        test( "setting via property \"trigger\" reflects to attribute \"trigger\"", function() {
          var edModal = document.createElement( "ed-modal" ),
              setTo = "Set via Property";

          edModal.trigger = setTo;

          expect( edModal.hasAttribute( "trigger" ) ).to.equal( true );
          expect( edModal.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( edModal.trigger );
        });
      });

      suite( "clickoff", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "ed-modal" ) )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via \"setAttribute\"", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "clickOff", "" );

          expect( edModal.hasAttribute( "clickOff" ) ).to.equal( true );
          expect( edModal.getAttribute( "clickOff" ) )
            .to.be.a( "string" )
            .and.equal( "" );
        });

        test( "can be set via property \"clickOff\"", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.clickOff = true;
          expect( edModal )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via attribute reflects to property", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "clickOff", "" );
          expect( edModal )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via property reflects to attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.clickOff = true;
          expect( edModal.hasAttribute( "clickOff" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );
        });

        // remove attribute sets to false
        test( "removing attribute reflects to attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "clickOff", "" );
          expect( edModal.hasAttribute( "clickOff" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );

          edModal.removeAttribute( "clickOff" );
          expect( edModal )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "setting property to false removes attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.clickOff = true;
          expect( edModal )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( true );

          expect( edModal.hasAttribute( "clickOff" ) )
            .to.be.a( "boolean" )
            .that.equals( true );

          edModal.clickOff = false;
          expect( edModal )
            .to.have.property( "clickOff" )
            .that.is.a( "boolean" )
            .and.equals( false );

          expect( edModal.hasAttribute( "clickOff" ) )
            .to.be.a( "boolean" )
            .and.to.equal( false );
        });
      });

      suite( "closebutton", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "ed-modal" ) )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via \"setAttribute\"", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "closeButton", "" );
          expect( edModal.hasAttribute( "closeButton" ) ).to.equal( true );
          expect( edModal.getAttribute( "closeButton" ) )
            .to.be.a( "string" )
            .and.equal( "" );
        });

        test( "can be set via property \"closeButton\"", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.closeButton = true;
          expect( edModal )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via attribute reflects to property", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "closeButton", "" );
          expect( edModal )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via property reflects to attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.closeButton = true;
          expect( edModal.hasAttribute( "closeButton" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );
        });

        test( "removing attribute reflects to attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.setAttribute( "closeButton", "" );
          expect( edModal.hasAttribute( "closeButton" ) )
            .to.be.a( "boolean" )
            .and.to.equal( true );

          edModal.removeAttribute( "closeButton" );
          expect( edModal )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "setting property to false removes attribute", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.closeButton = true;
          expect( edModal )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( true );

          expect( edModal.hasAttribute( "closeButton" ) )
            .to.be.a( "boolean" )
            .that.equals( true );

          edModal.closeButton = false;
          expect( edModal )
            .to.have.property( "closeButton" )
            .that.is.a( "boolean" )
            .and.equals( false );

          expect( edModal.hasAttribute( "closeButton" ) )
            .to.be.a( "boolean" )
            .and.to.equal( false );
        });
      });

      suite( "isOpen", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "ed-modal" ) )
            .to.have.property( "isOpen" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "cannot be set via property \"isOpen\"", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.isOpen = true;
          expect( edModal )
            .to.have.property( "isOpen" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "setting via .open() method sets isOpen to true", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.open();

          expect( edModal )
            .to.have.property( "isOpen" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "setting via .close() method sets isOpen to false", function() {
          var edModal = document.createElement( "ed-modal" );

          edModal.close();

          expect( edModal )
            .to.have.property( "isOpen" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });
      });
    });
  });
})( window, document, window.chai );
