/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
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
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "flip-box" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<flip-box></flip-box>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        testingWrapper.appendChild( document.createElement( "flip-box" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<flip-box trigger=\"box\" animation=\"horizontal\" rotation=\"toggle\"></flip-box>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM Element", function() {
        var flipBox = document.createElement( "flip-box" );

        testingWrapper.appendChild( flipBox );
        testingWrapper.removeChild( flipBox );

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
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "animation", "Set via Attribute" );

          expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( "horizontal" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box animation=\"horizontal\"></flip-box>" );
        });

        test( "can be set via property \"animation\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.animation = "Set via Property";

          expect( flipBox )
            .to.have.property( "animation" )
            .that.equals( "horizontal" );
        });

        test( "setting via \"setAttribute\" reflects to property \"animation\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "animation", "Set via Attribute" );

          expect( flipBox )
            .to.have.property( "animation" )
            .that.equals( "horizontal" )
            .and.equals( flipBox.getAttribute( "animation" ) );
        });

        test( "setting via property \"animation\" reflects to attribute \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "Set via Property";
            expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "animation" ) )
              .to.be.a( "string" )
              .that.equals( "horizontal" )
              .and.equal( flipBox.animation );
          });
      });

      suite( "trigger", function() {
      /* setAttribute */
        test( "can be set via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "trigger", "Set via Attribute" );

          expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );

          expect( flipBox.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( "box" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box trigger=\"box\"></flip-box>" );
        });

        test( "can be set via property \"trigger\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.trigger = "Set via Property";

          expect( flipBox )
            .to.have.property( "trigger" )
            .that.equals( "box" );
        });

        test( "setting via \"setAttribute\" reflects to property \"trigger\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "trigger", "box" );
          expect( flipBox )
            .to.have.property( "trigger" )
            .that.equals( "box" )
            .and.equals( flipBox.getAttribute( "trigger" ) );
        });

        test( "setting via property \"trigger\" reflects to attribute \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "Set via Property";
            expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );
            expect( flipBox.getAttribute( "trigger" ) )
              .to.be.a( "string" )
              .that.equals( "box" );
            expect( flipBox.trigger ).to.equal( "box" );
          });
      });

      suite( "rotation", function() {
        test( "can be set via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "rotation", "Set via Attribute" );

          expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( "toggle" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box rotation=\"toggle\"></flip-box>" );
        });

        test( "can be set via property \"rotation\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.rotation = "Set via Property";

          expect( flipBox )
            .to.have.property( "rotation" )
            .that.equals( "toggle" );
        });

        test( "setting via \"setAttribute\" reflects to property \"rotation\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "rotation", "Set via Attribute" );
          expect( flipBox )
            .to.have.property( "rotation" )
            .that.equals( "toggle" )
            .and.equals( flipBox.getAttribute( "rotation" ) );
        });

        test( "setting via property \"rotation\" reflects to attribute \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "Set via Property";
            expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "rotation" ) )
              .to.be.a( "string" )
              .that.equals( "toggle" );
            expect( flipBox.rotation ).to.equal( "toggle" );
          });
      });
    });

    suite( "Methods", function() {
      // test( "customEvent", function( done ) {});
    });
  });
})( window, document, window.chai );
