/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
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
        testingWrapper.appendChild( document.createElement( "paired-input" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<paired-input></paired-input>" );

        resetWrapper();
      });

      test( "detached: can be removed from another DOM element", function() {
        var pairedInput = document.createElement( "paired-input" );

        testingWrapper.appendChild( pairedInput );
        testingWrapper.removeChild( pairedInput );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {

      /** Tests for Type **/
      suite( "type", function() {
        suite( "default values", function() {
          test( "default value is \"text\"", function() {
            var pairedInput = document.createElement( "paired-input" ),
                setTo = "set via Attribute";

            pairedInput.setAttribute( "type", setTo );

            expect( pairedInput.hasAttribute( "type" ) )
              .to.equal( true );

            expect( pairedInput.getAttribute( "type" ) )
              .to.be.a( "string" )
              .that.equals( "text" );

            expect( pairedInput )
              .to.have.property( "outerHTML" )
              .that.equals( '<paired-input type="text"></paired-input>' );
          });

          test( "setting via setAttribute, default value \"text\" reflects to property", function() {
            var pairedInput = document.createElement( "paired-input" ),
                setTo = "set via Attribute";

            pairedInput.setAttribute( "type", setTo );

            expect( pairedInput )
              .to.have.property( "type" )
              .that.equals( "text" )
              .and.equals( pairedInput.getAttribute( "type" ) );
          });

          test( "setting via property, default value \"text\" reflects to attribute", function() {
            var pairedInput = document.createElement( "paired-input" );

            pairedInput.type = "invalid-value";

            expect( pairedInput.getAttribute( "type" ) )
              .to.be.a( "string" )
              .that.equals( "text" );
          });
        });

        suite( "attempting to set invalid values", function() {
          test( "when set to an invalid value via setAttribute defaults to text", function() {
            var pairedInput = document.createElement( "paired-input" );

            pairedInput.setAttribute( "type", "invalid-value" );

            expect( pairedInput.hasAttribute( "type" ) )
              .to.equal( true );

            expect( pairedInput.getAttribute( "type" ) )
              .to.be.a( "string" )
              .that.equals( "text" );
          });

          test( "when set to an invalid value via setAttribute reflects to property", function() {
            var pairedInput = document.createElement( "paired-input" );

            pairedInput.setAttribute( "type", "invalid-value" );

            expect( pairedInput.hasAttribute( "type" ) )
              .to.equal( true );

            expect( pairedInput )
              .to.have.property( "type" )
              .that.equals( "text" )
              .and.equals( pairedInput.getAttribute( "type" ) );
          });

          test( "when set to an invalid value via property defaults to text", function() {
            var pairedInput = document.createElement( "paired-input" );

            pairedInput.type = "invalid-value";

            expect( pairedInput )
              .to.have.property( "type" )
              .that.equals( "text" )
              .and.equals( pairedInput.getAttribute( "type" ) );
          });

          test( "when set to an invalid value via property reflects to attribute", function() {
            var pairedInput = document.createElement( "paired-input" );

            pairedInput.type = "invalid-value";

            expect( pairedInput.getAttribute( "type" ) )
              .to.be.a( "string" )
              .that.equals( "text" );
          });
        });

        suite( "set acceptable values via setAttribute", function() {
          [
            "text",
            "password",
            "email",
            "tel",
            "number",
            "url",
            "search"
          ].forEach( function( value ) {
            test( "can be set via setAttribute to: " + value, function() {
              var pairedInput = document.createElement( "paired-input" );

              pairedInput.setAttribute( "type", value );

              expect( pairedInput.hasAttribute( "type" ) )
                .to.equal( true );

              expect( pairedInput.getAttribute( "type" ) )
                .to.be.a( "string" )
                .that.equals( value );
            });
          });

          [
            "text",
            "password",
            "email",
            "tel",
            "number",
            "url",
            "search"
          ].forEach( function( value ) {
            test( "setting via " + value + " reflects to property", function() {
              var pairedInput = document.createElement( "paired-input" );

              pairedInput.setAttribute( "type", value );

              expect( pairedInput )
                .to.have.property( "type" )
                .that.equals( value )
                .and.equals( pairedInput.getAttribute( "type" ) );
            });
          });
        });

        suite( "set acceptable values via property", function() {
          [
            "text",
            "password",
            "email",
            "tel",
            "number",
            "url",
            "search"
          ].forEach( function( value ) {
            test( "can be set via property to: " + value, function() {
              var pairedInput = document.createElement( "paired-input" );

              pairedInput.type = value;

              expect( pairedInput )
                .to.have.property( "type" )
                .that.equals( value )
                .and.equals( pairedInput.getAttribute( "type" ) );
            });
          });

          [
            "text",
            "password",
            "email",
            "tel",
            "number",
            "url",
            "search"
          ].forEach( function( value ) {
            test( "setting via " + value + " reflects to attribute", function() {
              var pairedInput = document.createElement( "paired-input" );

              pairedInput.type = value;

              expect( pairedInput.getAttribute( "type" ) )
                .to.be.a( "string" )
                .that.equals( value );
            });
          });
        });
      });

      /** Tests for placeholder **/
      suite( "placeholder", function() {
        test( "can be set via \"setAttribute\"", function() {
          var pairedInput = document.createElement( "paired-input" ),
              setTo = "Set via Attribute";

          pairedInput.setAttribute( "placeholder", setTo );

          expect( pairedInput.hasAttribute( "placeholder" ) ).to.equal( true );

          expect( pairedInput.getAttribute( "placeholder" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.equals( "<paired-input placeholder=\"" + setTo + "\"></paired-input>" );
        });

        test( "can be removed via removeAttribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "placeholder", "something" );
          pairedInput.removeAttribute( "placeholder" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "when set via setAttribute, placeholder value should reflect to shadowDom",
          function() {
            var pairedInput = document.createElement( "paired-input" ),
                setTo = "Set via Attribute";

            pairedInput.setAttribute( "placeholder", setTo );

            expect( pairedInput.$.primaryBox.getAttribute( "placeholder" ) )
              .to.be.a( "string" )
              .that.equals( setTo );

            console.log( pairedInput.$.confirmBox.getAttribute( "placeholder" ) );
            expect( pairedInput.$.confirmBox.getAttribute( "placeholder" ) )
              .to.be.a( "string" )
              .that.equals( "Confirm " + setTo );

            // expect( elem.$.primaryBox ).has( "placeholder" ).equals( "set" )
            // expect( elem.$.confirmBox ).has( "placeholder" ).equals( "Confirm" + "set" )

        });

        test( "when set via property, placeholder value should reflect to shadowDom",
          function() {
            var pairedInput = document.createElement( "paired-input" ),
                setTo = "Set via Attribute";

            pairedInput.placeholder = setTo;

            expect( pairedInput.$.primaryBox )
              .to.have.property( "placeholder" )
              .that.equals( setTo );

            console.log( pairedInput.$.confirmBox.placeholder );
            expect( pairedInput.$.confirmBox )
              .to.have.property( "placeholder" )
              .that.equals( "Confirm " + setTo );
          });
      });

      // Tests for pattern
      suite( "pattern", function() {
        test( "can be set via \"setAttribute\"", function() {
          var pairedInput = document.createElement( "paired-input" ),
              setTo = "Set via Attribute";

          pairedInput.setAttribute( "pattern", setTo );

          expect( pairedInput.hasAttribute( "pattern" ) ).to.equal( true );

          expect( pairedInput.getAttribute( "pattern" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.equals( "<paired-input pattern=\"" + setTo + "\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "pattern", "something" );
          pairedInput.removeAttribute( "pattern" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "reject if invalid type", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "pattern", "[A-Za-z]{3}" );
          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = "6848948";

          expect( pairedInput.hasAttribute( "invalid" ) ).to.equal( true );
        });
      });
      // Tests for single-line
      suite( "single-line", function() {
        test( "can be set via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "single-line", "" );

          expect( pairedInput.hasAttribute( "single-line" ) ).to.equal( true );
          expect( pairedInput.getAttribute( "single-line" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input single-line=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "single-line", "" );
          pairedInput.removeAttribute( "single-line" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });
      });
      // Tests for required
      suite( "required", function() {
        test( "can be set via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "required", "" );

          expect( pairedInput.hasAttribute( "required" ) ).to.equal( true );
          expect( pairedInput.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input required=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "required", "" );
          pairedInput.removeAttribute( "required" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });
      });
      // Tests for disabled
      suite( "disabled", function() {
        test( "can be set via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "disabled", "" );

          expect( pairedInput.hasAttribute( "disabled" ) ).to.equal( true );
          expect( pairedInput.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input disabled=\"\"></paired-input>" );
        });

        test( "can be removed via attribute", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.setAttribute( "disabled", "" );
          pairedInput.removeAttribute( "disabled" );

          expect( pairedInput )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<paired-input></paired-input>" );
        });

        test( "should not be able to input value with disable tag present", function() {
          // pairedInput is defined as firstInput requires pairedInput and is used twice
          var pairedInput = document.createElement( "paired-input" ),
            firstInput = pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ];

          document.createElement( "paired-input" ).setAttribute( "disabled", "" );
          firstInput.value = "random value";

          expect( firstInput )
            .to.have.property( "value" )
            .to.be.empty();
        });
      });
      // Tests for valid
      suite( "valid", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "paired-input" ) )
            .to.have.property( "valid" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "is true when input values match", function() {
          var pairedInput = document.createElement( "paired-input" ),
              genericValue = "random test value";

          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = genericValue;
          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = genericValue;

          expect( pairedInput )
            .to.have.property( "valid" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });
      });
      // Tests for value
      suite( "value", function() {
        test( "returns undefined when element is not valid", function() {
          var pairedInput = document.createElement( "paired-input" );

          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = "first value";
          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = "second value";

          expect( pairedInput )
            .to.have.property( "value" )
            .to.be.undefined();
        });

        test( "returns value if both input fields match", function() {
          var pairedInput = document.createElement( "paired-input" ),
              genericValue = "random test value";

          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ].value = genericValue;
          pairedInput.shadowRoot.getElementsByTagName( "input" )[ 1 ].value = genericValue;

          expect( pairedInput )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );
        });

        test( "set value of both input fields via property", function() {
          var pairedInput = document.createElement( "paired-input" ),
              genericValue = "random test value";

          pairedInput.value = genericValue;

          expect( pairedInput.shadowRoot.getElementsByTagName( "input" )[ 0 ] )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );

          expect( pairedInput.shadowRoot.getElementsByTagName( "input" )[ 1 ] )
            .to.have.property( "value" )
            .to.be.a( "string" )
            .that.equals( genericValue );
        });
      });
    });
  });
})( window, document, window.chai );
