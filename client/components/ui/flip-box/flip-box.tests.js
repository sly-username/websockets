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
    /* Animation */
      suite( "animation", function() {
        test( "can be set to default value = \"horizontal\" via setAttribute", function() {
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

        test( "can be set to value = \"horizontal\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "animation", "horizontal" );

          expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( "horizontal" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box animation=\"vertical\"></flip-box>" );
        });

        test( "can be set to value = \"vertical\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "animation", "vertical" );

          expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( "vertical" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box animation=\"vertical\"></flip-box>" );
        });

        test( "can be set to default value = \"horizontal\" via property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "Set via Property";

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "horizontal" );
          });

        test( "can be set to value = \"horizontal\" via property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "horizontal";

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "horizontal" );
          });

        test( "can be set to value = \"vertical\" via property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "vertical";

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "vertical" );
          });

        test( "set invalid value via \"setAttribute\" reflects to property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "animation", "Set via Property" );

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "horizontal" )
              .and.equals( flipBox.getAttribute( "animation" ) );
          });

        test( "set value = \"horizontal\" via \"setAttribute\" reflects to property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "animation", "horizontal" );

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "horizontal" )
              .and.equals( flipBox.getAttribute( "animation" ) );
          });

        test( "set value = \"vertical\" via \"setAttribute\" reflects to property \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "animation", "vertical" );

            expect( flipBox )
              .to.have.property( "animation" )
              .that.equals( "vertical" )
              .and.equals( flipBox.getAttribute( "animation" ) );
          });

        test( "set invalid value via property \"animation\" reflects to attribute \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "Set via Property";
            expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "animation" ) )
              .to.be.a( "string" )
              .that.equals( "horizontal" )
              .and.equal( flipBox.animation );
          });

        test( "set value = \"horizontal\" via property \"animation\" reflects to attribute \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "horizontal";
            expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "animation" ) )
              .to.be.a( "string" )
              .that.equals( "horizontal" )
              .and.equal( flipBox.animation );
          });

        test( "set value = \"vertical\" via property \"animation\" reflects to attribute \"animation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.animation = "vertical";
            expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "animation" ) )
              .to.be.a( "string" )
              .that.equals( "vertical" )
              .and.equal( flipBox.animation );
          });
      });

    /* Trigger */
      suite( "trigger", function() {
        test( "can be set to default value = \"box\" via setAttribute", function() {
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

        test( "can be set to value = \"box\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "trigger", "box" );

          expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );

          expect( flipBox.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( "box" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box trigger=\"btn\"></flip-box>" );
        });

        test( "can be set to value = \"btn\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "trigger", "btn" );

          expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );

          expect( flipBox.getAttribute( "trigger" ) )
            .to.be.a( "string" )
            .that.equals( "btn" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box trigger=\"btn\"></flip-box>" );
        });

        test( "can be set to default value = \"box\" via property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "Set via Property";

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "box" );
          });

        test( "can be set to value = \"box\" via property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "box";

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "box" );
          });

        test( "can be set to value = \"btn\" via property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "btn";

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "btn" );
          });

        test( "set invalid value via \"setAttribute\" reflects to property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "trigger", "Set via Property" );

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "box" )
              .and.equals( flipBox.getAttribute( "trigger" ) );
          });

        test( "set value = \"box\" via \"setAttribute\" reflects to property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "trigger", "box" );

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "box" )
              .and.equals( flipBox.getAttribute( "trigger" ) );
          });

        test( "set value = \"btn\" via \"setAttribute\" reflects to property \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "trigger", "btn" );

            expect( flipBox )
              .to.have.property( "trigger" )
              .that.equals( "btn" )
              .and.equals( flipBox.getAttribute( "trigger" ) );
          });

        test( "set invalid value via property \"trigger\" reflects to attribute \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "Set via Property";
            expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );
            expect( flipBox.getAttribute( "trigger" ) )
              .to.be.a( "string" )
              .that.equals( "box" )
              .and.equal( flipBox.trigger );
          });

        test( "set value = \"box\" via property \"trigger\" reflects to attribute \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "box";
            expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );
            expect( flipBox.getAttribute( "trigger" ) )
              .to.be.a( "string" )
              .that.equals( "box" )
              .and.equal( flipBox.trigger );
          });

        test( "set value = \"btn\" via property \"trigger\" reflects to attribute \"trigger\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.trigger = "btn";
            expect( flipBox.hasAttribute( "trigger" ) ).to.equal( true );
            expect( flipBox.getAttribute( "trigger" ) )
              .to.be.a( "string" )
              .that.equals( "btn" )
              .and.equal( flipBox.trigger );
          });
      });

    /* Rotation */
      suite( "rotation", function() {
        test( "can be set to default value = \"box\" via setAttribute", function() {
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

        test( "can be set to value = \"toggle\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "rotation", "toggle" );

          expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( "toggle" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box rotation=\"loop\"></flip-box>" );
        });

        test( "can be set to value = \"loop\" via setAttribute", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.setAttribute( "rotation", "loop" );

          expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "rotation" ) )
            .to.be.a( "string" )
            .that.equals( "loop" );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box rotation=\"loop\"></flip-box>" );
        });

        test( "can be set to default value = \"toggle\" via property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "Set via Property";

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "toggle" );
          });

        test( "can be set to value = \"toggle\" via property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "box";

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "toggle" );
          });

        test( "can be set to value = \"loop\" via property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "loop";

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "loop" );
          });

        test( "set invalid value via \"setAttribute\" reflects to property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "rotation", "Set via Property" );

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "toggle" )
              .and.equals( flipBox.getAttribute( "rotation" ) );
          });

        test( "set value = \"toggle\" via \"setAttribute\" reflects to property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "rotation", "toggle" );

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "toggle" )
              .and.equals( flipBox.getAttribute( "rotation" ) );
          });

        test( "set value = \"loop\" via \"setAttribute\" reflects to property \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.setAttribute( "rotation", "loop" );

            expect( flipBox )
              .to.have.property( "rotation" )
              .that.equals( "loop" )
              .and.equals( flipBox.getAttribute( "rotation" ) );
          });

        test( "set invalid value via property \"rotation\" reflects to attribute \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "Set via Property";
            expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "rotation" ) )
              .to.be.a( "string" )
              .that.equals( "toggle" )
              .and.equal( flipBox.rotation );
          });

        test( "set value = \"toggle\" via property \"rotation\" reflects to attribute \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "toggle";
            expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "rotation" ) )
              .to.be.a( "string" )
              .that.equals( "toggle" )
              .and.equal( flipBox.rotation );
          });

        test( "set value = \"loop\" via property \"rotation\" reflects to attribute \"rotation\"",
          function() {
            var flipBox = document.createElement( "flip-box" );

            flipBox.rotation = "loop";
            expect( flipBox.hasAttribute( "rotation" ) ).to.equal( true );
            expect( flipBox.getAttribute( "rotation" ) )
              .to.be.a( "string" )
              .that.equals( "loop" )
              .and.equal( flipBox.rotation );
          });
      });
    });

    suite( "Methods", function() {
      suite( "isFlipped", function() {
        test( "default value is \"false\"", function() {
          expect( document.createElement( "flip-box" ) )
            .to.have.property( "isFlipped" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "cannot be set via property \"isFlipped\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.isFlipped = true;
          expect( flipBox )
            .to.have.property( "isFlipped" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( ".flip() method sets isFlipped to \"true\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.flip();

          expect( flipBox )
            .to.have.property( "isFlipped" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "when isFlipped is \"true\", .flip() sets isFlipped to \"false\"", function() {
          var flipBox = document.createElement( "flip-box" );

          flipBox.flip();

          expect( flipBox )
            .to.have.property( "isFlipped" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });
      });
    });
  });
})( window, document, window.chai );
