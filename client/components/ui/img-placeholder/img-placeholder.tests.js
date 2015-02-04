/*eslint-env mocha */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
      imageMap = ( function() {
        var urlPrefix = "http://",
            urlPostfix = ".com/200/300",
            map = {},
            imageNames = [
              "fillmurray",
              "placecage"
            ];

        imageNames.forEach( function( imageName ) {
          map[imageName] = urlPrefix + imageName + urlPostfix;
        });
        return map;
      })(),
  // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "img-placeholder-test-wrapper" ) ||
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

  suite( "<img-placeholder>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "img-placeholder" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<img-placeholder></img-placeholder>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "img-placeholder" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<img-placeholder></img-placeholder>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var imgPlaceholder = document.createElement( "img-placeholder" );

        testingWrapper.appendChild( imgPlaceholder );
        testingWrapper.removeChild( imgPlaceholder );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      suite( "Image", function() {
        test( "can be set via \"setAttribute\"", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Attribute";

          imgPlaceholder.setAttribute( "on-text", setTo );

          expect( imgPlaceholder.hasAttribute( "on-text" ) ).to.equal( true );

          expect( imgPlaceholder.getAttribute( "on-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( imgPlaceholder )
            .to.have.property( "outerHTML" )
            .that.equals( "<img-placeholder on-text=\"" + setTo + "\"></img-placeholder>" );
        });

        test( "can be set via property \"onText\"", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Property";

          imgPlaceholder.onText = setTo;

          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"onText\"", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Attribute";

          imgPlaceholder.setAttribute( "on-text", setTo );

          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.equals( setTo )
            .and.equals( imgPlaceholder.getAttribute( "on-text" ) );
        });

        test( "setting via property \"onText\" reflects to attribute \"on-text\"", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Property";

          imgPlaceholder.onText = setTo;

          expect( imgPlaceholder.hasAttribute( "on-text" ) ).to.equal( true );
          expect( imgPlaceholder.getAttribute( "on-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( imgPlaceholder.onText );
        });

        test( "removing attribute \"on-text\" sets property back to default value", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Attribute";

          imgPlaceholder.setAttribute( "on-text", setTo );
          expect( imgPlaceholder.hasAttribute( "on-text" ) ).to.equal( true );

          imgPlaceholder.removeAttribute( "on-text" );
          expect( imgPlaceholder.hasAttribute( "on-text" ) ).to.equal( false );

          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( "On" );
        });

        test( "setting \"onText\" to null resets property to default value", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Property";

          imgPlaceholder.onText = setTo;
          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          imgPlaceholder.onText = null;
          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });

        test( "setting \"onText\" to undefined resets property to default value", function() {
          var imgPlaceholder = document.createElement( "img-placeholder" ),
              setTo = "Set via Property";

          imgPlaceholder.onText = setTo;
          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          imgPlaceholder.onText = undefined;
          expect( imgPlaceholder )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });
      });
    });
  });
})( window, document, window.chai );
