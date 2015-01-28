/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    newFlipBox = function() {
      return document.createElement( "flip-box" );
    },
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "flip-box-test-wrapper" ) ||
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

  suite( "<flip-box>", function() {
    var element;
    setup( function() {
      element = newFlipBox();
    });

    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<flip-box></flip-box>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        var newElement = document.createElement( "flip-box" );

        testingWrapper.appendChild( newElement );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<flip-box></flip-box>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM Element", function() {
        var newElement = document.createElement( "flip-box" );

        testingWrapper.appendChild( newElement );
        testingWrapper.removeChild( newElement );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes", function() {
    /* setAttribute */
      suite( "animation", function() {
        test( "can be set via setAttribute", function() {
          var setTo = "Set via Attribute";

          element.setAttribute( "animation", setTo );

          expect( element.hasAttribute( "animation" ) ).to.equal( true );

          expect( element.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( element )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box animation=\"" + setTo + "\"></flip-box>" );
        });

        test( "can be set via property \"animation\"", function() {
          var setTo = "Set via Property";

          element.animation = setTo;

          expect( element )
            .to.have.property( "animation" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"animation\"", function() {
          var setTo = "Set via Attribute";

          element.setAttribute( "animation", setTo );

          expect( element )
            .to.have.property( "animation" )
            .that.equals( setTo )
            .and.equals( element.getAttribute( "animation" ) );
        });

        test( "setting via property \"animation\" reflects to attribute \"animation\"",
          function() {
          var setTo = "Set via Property";

          element.animation = setTo;
          expect( element.hasAttribute( "animation" ) ).to.equal( true );
          expect( element.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( element.animation );
        });
      });

      suite( "trigger", function() {
      /* setAttribute */
        test( "can be set via setAttribute", function() {
          var setTo = "Set via Attribute";

          element.setAttribute( "trigger", setTo );

          expect( element.hasAttribute( "trigger" ) ).to.equal( true );

          expect( element.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( element )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box trigger=\"" + setTo + "\"></flip-box>" );
        });

        test( "can be set via property \"trigger\"", function() {
          var setTo = "Set via Property";

          element.trigger = setTo;

          expect( element )
            .to.have.property( "trigger" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"trigger\"", function() {
          var setTo = "Set via Attribute";

          element.setAttribute( "trigger", setTo );
          expect( element )
            .to.have.property( "trigger" )
            .that.equals( setTo )
            .and.equals( element.getAttribute( "trigger" ) );
        });

        test( "setting via property \"trigger\" reflects to attribute \"trigger\"",
          function() {
            var setTo = "Set via Property";

            element.trigger = setTo;
            expect( element.hasAttribute( "trigger" ) ).to.equal( true );
            expect( element.getAttribute( "trigger" ) )
              .to.be.a( "string" )
              .that.equals( setTo )
              .and.equal( element.trigger );
          });
      });
    });

    suite( "Events", function() {
      test( "customEvent", function( done ) {});
    });
  });
})( window, document, window.chai );
