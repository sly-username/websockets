/*eslint-env mocha */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "scroll-box-vertical-test-wrapper" ) ||
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

  suite( "<scroll-box-vertical>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "scroll-box-vertical" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "scroll-box-vertical" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var sbVert = document.createElement( "scroll-box-vertical" );

        testingWrapper.appendChild( sbVert );
        testingWrapper.removeChild( sbVert );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      // Disabled Attribute and Properties
      suite( "disabled", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "scroll-box-vertical" ) )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "disabled", "" );

          expect( sbVert.hasAttribute( "disabled" ) ).to.equal( true );
          expect( sbVert.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical disabled=\"\"></scroll-box-vertical>" );
        });

        test( "can be set via attribute reflect property", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "disabled", "" );

          expect( sbVert )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.disabled = true;

          expect( sbVert.hasAttribute( "disabled" ) ).to.equal( true );
          expect( sbVert.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "disabled", "" );
          sbVert.removeAttribute( "disabled" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.disabled = true;
          sbVert.removeAttribute( "disabled" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "disabled", "" );
          sbVert.disabled = false;

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });
      });

      suite( "show-arrows", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "scroll-box-vertical" ) )
            .to.have.property( "showArrows" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "show-arrows", "" );

          expect( sbVert.hasAttribute( "show-arrows" ) ).to.equal( true );
          expect( sbVert.getAttribute( "show-arrows" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical show-arrows=\"\"></scroll-box-vertical>" );
        });

        test( "can be set via attribute reflect property", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "show-arrows", "" );

          expect( sbVert )
            .to.have.property( "showArrows" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.showArrows = true;

          expect( sbVert.hasAttribute( "show-arrows" ) ).to.equal( true );
          expect( sbVert.getAttribute( "show-arrows" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "show-arrows", "" );
          sbVert.removeAttribute( "show-arrows" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.showArrows = true;
          sbVert.removeAttribute( "show-arrows" );

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var sbVert = document.createElement( "scroll-box-vertical" );

          sbVert.setAttribute( "show-arrows", "" );
          sbVert.showArrows = false;

          expect( sbVert )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-vertical></scroll-box-vertical>" );
        });
      });

      suite( "scroll down", function() {
        test( "scrolls the inside bucket down", function() {
          var sbVert = document.createElement( "scroll-box-vertical" ),
              image = document.createElement( "img" );

          image.src = "http://i2.kym-cdn.com/photos/images/newsfeed/000/117/814/are-you-wizard.jpg";
          testingWrapper.appendChild( sbVert );

          sbVert.appendChild( image );
          sbVert.scrollDown( "50px" );

          expect( sbVert.shadowRoot.querySelector( ".inner-box" ) )
            .to.have.property( "scrollTop" )
            .that.is.a( "number" )
            .and.equals( 50 );

          resetWrapper();
        });
      });

      suite( "scroll up", function() {
        test( "scrolls the inside bucket up", function() {
          var sbVert = document.createElement( "scroll-box-vertical" ),
              image = document.createElement( "img" );

          image.src = "http://i2.kym-cdn.com/photos/images/newsfeed/000/117/814/are-you-wizard.jpg";
          testingWrapper.appendChild( sbVert );

          sbVert.appendChild( image );
          sbVert.scrollDown( "50px" );
          sbVert.scrollUp( "30px" );

          expect( sbVert.shadowRoot.querySelector( ".inner-box" ) )
            .to.have.property( "scrollTop" )
            .that.is.a( "number" )
            .and.equals( 20 );

          resetWrapper();
        });
      });
    });
  });
})( window, document, window.chai );
