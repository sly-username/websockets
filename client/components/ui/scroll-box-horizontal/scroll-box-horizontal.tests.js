/*eslint-env mocha */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
      // get wrapper from document or for karma, create a new div and append it to the DOM
      testingWrapper = document.getElementById( "scroll-box-horizontal-test-wrapper" ) ||
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

  suite( "<scroll-box-horizontal>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "scroll-box-horizontal" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "scroll-box-horizontal" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var sbHort = document.createElement( "scroll-box-horizontal" );

        testingWrapper.appendChild( sbHort );
        testingWrapper.removeChild( sbHort );

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
          expect( document.createElement( "scroll-box-horizontal" ) )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "disabled", "" );

          expect( sbHort.hasAttribute( "disabled" ) ).to.equal( true );
          expect( sbHort.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal disabled=\"\"></scroll-box-horizontal>" );
        });

        test( "can be set via attribute reflect property", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "disabled", "" );

          expect( sbHort )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.disabled = true;

          expect( sbHort.hasAttribute( "disabled" ) ).to.equal( true );
          expect( sbHort.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "disabled", "" );
          sbHort.removeAttribute( "disabled" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.disabled = true;
          sbHort.removeAttribute( "disabled" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "disabled", "" );
          sbHort.disabled = false;

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });
      });

      suite( "show-arrows", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "scroll-box-horizontal" ) )
            .to.have.property( "show-arrows" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "show-arrows", "" );

          expect( sbHort.hasAttribute( "show-arrows" ) ).to.equal( true );
          expect( sbHort.getAttribute( "show-arrows" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal show-arrows=\"\"></scroll-box-horizontal>" );
        });

        test( "can be set via attribute reflect property", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "show-arrows", "" );

          expect( sbHort )
            .to.have.property( "show-arrows" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort[ "show-arrows" ] = true;

          expect( sbHort.hasAttribute( "show-arrows" ) ).to.equal( true );
          expect( sbHort.getAttribute( "show-arrows" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "show-arrows", "" );
          sbHort.removeAttribute( "show-arrows" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort[ "show-arrows" ] = true;
          sbHort.removeAttribute( "show-arrows" );

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" );

          sbHort.setAttribute( "show-arrows", "" );
          sbHort[ "show-arrows" ] = false;

          expect( sbHort )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<scroll-box-horizontal></scroll-box-horizontal>" );
        });
      });

      suite( "scroll box right", function() {
        test( "scrolls the inside bucket right", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" ),
              image = document.createElement( "img" );

          image.src = "http://i2.kym-cdn.com/photos/images/newsfeed/000/117/814/are-you-wizard.jpg";
          testingWrapper.appendChild( sbHort );

          sbHort.appendChild( image );
          sbHort.scrollBoxRight( "50px" );

          expect( sbHort.shadowRoot.querySelector( ".inner-box" ) )
            .to.have.property( "scrollLeft" )
            .that.is.a( "number" )
            .and.equals( 50 );

          resetWrapper();
        });
      });

      suite( "scroll box left", function() {
        test( "scrolls the inside bucket left", function() {
          var sbHort = document.createElement( "scroll-box-horizontal" ),
              image = document.createElement( "img" );

          image.src = "http://i2.kym-cdn.com/photos/images/newsfeed/000/117/814/are-you-wizard.jpg";
          testingWrapper.appendChild( sbHort );

          sbHort.appendChild( image );
          sbHort.scrollBoxRight( "50px" );
          sbHort.scrollBoxLeft( "30px" );

          expect( sbHort.shadowRoot.querySelector( ".inner-box" ) )
            .to.have.property( "scrollLeft" )
            .that.is.a( "number" )
            .and.equals( 20 );

          resetWrapper();
        });
      });
    });
  });
})( window, document, window.chai );
