/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
      newPairInput = function() {
        return document.createElement( "paired-input" );
      },
      // get wrapper from document or for karma, create a new div and append it to the DOM
      testingWrapper = document.getElementById( "paired-input-test-wrapper" ) ||
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

  suite( "<paired-input>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "paired-input" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<paired-input></paired-input>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        var pairInput = newPairInput();

        testingWrapper.appendChild( pairInput );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<paired-input></paired-input>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var pairInput = newPairInput();

        testingWrapper.appendChild( pairInput );
        testingWrapper.removeChild( pairInput );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      // Tests for Type
      suite( "type", function() {
        test( "can be set via \"setAttribute\"", function() {
          var pairInput = newPairInput(),
              setTo = "Set via Attribute";

          pairInput.setAttribute( "type", setTo );

          expect( pairInput.hasAttribute( "type" ) ).to.equal( true );

          expect( pairInput.getAttribute( "type" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.equals( "<paired-input type=\"" + setTo + "\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput(),
          setTo = "Set via Attribute";

          pairInput.setAttribute( "type", setTo );
          pairInput.removeAttribute( "type" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "reject if type is an invalid type", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "type", "button" );

          expect( pairInput.hasAttribute( "invalid" ) ).to.equal( true );
        });
      });
      // Tests for placeholder
      suite( "placeholder", function() {
        test( "can be set via \"setAttribute\"", function() {
          var pairInput = newPairInput(),
              setTo = "Set via Attribute";

          pairInput.setAttribute( "placeholder", setTo );

          expect( pairInput.hasAttribute( "placeholder" ) ).to.equal( true );

          expect( pairInput.getAttribute( "placeholder" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.equals( "<paired-input placeholder=\"" + setTo + "\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput(),
              setTo = "Set via Attribute";

          pairInput.setAttribute( "placeholder", setTo );
          pairInput.removeAttribute( "placeholder" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });
      });
      // Tests for pattern
      suite( "pattern", function() {
        test( "can be set via \"setAttribute\"", function() {
          var pairInput = newPairInput(),
              setTo = "Set via Attribute";

          pairInput.setAttribute( "pattern", setTo );

          expect( pairInput.hasAttribute( "pattern" ) ).to.equal( true );

          expect( pairInput.getAttribute( "pattern" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.equals( "<paired-input pattern=\"" + setTo + "\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput(),
              setTo = "Set via Attribute";

          pairInput.setAttribute( "pattern", setTo );
          pairInput.removeAttribute( "pattern" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "reject if invalid type", function() {
          var pairInput = newPairInput(),
              genericValue = "649595";

          pairInput.setAttribute( "pattern", "[A-Za-z]{3}" );
          pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = genericValue;

          expect( pairInput.hasAttribute( "invalid" ) ).to.equal( true );
        });
      });
      // Tests for single-line
      suite( "single-line", function() {
        test( "can be set via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "single-line", "" );

          expect( pairInput.hasAttribute( "single-line" ) ).to.equal( true );
          expect( pairInput.getAttribute( "single-line" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input single-line=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "single-line", "" );
          pairInput.removeAttribute( "single-line" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });
      });
      // Tests for required
      suite( "required", function() {
        test( "can be set via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "required", "" );

          expect( pairInput.hasAttribute( "required" ) ).to.equal( true );
          expect( pairInput.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input required=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "required", "" );
          pairInput.removeAttribute( "required" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });
      });
      // Tests for disabled
      suite( "disabled", function() {
        test( "can be set via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "disabled", "" );

          expect( pairInput.hasAttribute( "disabled" ) ).to.equal( true );
          expect( pairInput.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input disabled=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairInput = newPairInput();

          pairInput.setAttribute( "disabled", "" );
          pairInput.removeAttribute( "disabled" );

          expect( pairInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "should not be able to input value with disable tag present", function() {
          var pairInput = newPairInput(),
              genericValue = "random test value",
              firstInput = pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ];

          pairInput.setAttribute( "disabled", "" );
          firstInput.value = genericValue;

          expect( firstInput )
            .to.have.property( "value" )
            .to.be.empty();
        });
      });
      // Tests for valid
      suite( "valid", function() {
        test( "has default value: false", function() {
          var pairInput = newPairInput();

          expect( pairInput )
            .to.have.property( "valid" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "is true when input values match", function() {
          var pairInput = newPairInput(),
              genericValue = "random test value";

          pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = genericValue;
          pairInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = genericValue;

          expect( pairInput )
            .to.have.property( "valid" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });
      });
      // Tests for value
      suite( "value", function() {
        test( "returns undefined when element is not valid", function() {
          var pairInput = newPairInput(),
              firstValue = "first value",
              secondValue = "second value";

          pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = firstValue;
          pairInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = secondValue;

          expect( pairInput )
            .to.have.property( "value" )
            .to.be.undefined();
        });

        test( "returns value if both input fields match", function() {
          var pairInput = newPairInput(),
              genericValue = "random test value";

          pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = genericValue;
          pairInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = genericValue;

          expect( pairInput )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );
        });

        test( "set value of both input fields via property", function() {
          var pairInput = newPairInput(),
              genericValue = "random test value",
              firstInput = pairInput.shadowRoot.getElementsByTagName( "input" )[ 0 ],
              secondInput = pairInput.shadowRoot.getElementsByTagName( "input" )[ 1 ];

          pairInput.value = genericValue;

          expect( firstInput )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );

          expect( secondInput )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );
        });
      });
    });
  });
})( window, document, window.chai );
