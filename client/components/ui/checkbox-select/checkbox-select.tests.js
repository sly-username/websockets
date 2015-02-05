/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    // get wrapper from document or for karma, create a new div and append it to the DOM
    testingWrapper = document.getElementById( "checkbox-select-test-wrapper" ) ||
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

  suite( "<checkbox-select>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "checkbox-select" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<checkbox-select></checkbox-select>" );
      });

      test( "attached: can be added to the DOM", function() {
        testingWrapper.appendChild( document.createElement( "checkbox-select" ) );

        expect( testingWrapper )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<checkbox-select></checkbox-select>" );

        resetWrapper();
      });

      test( "detached: can be removed from another Dom element", function() {
        var checkSelect = document.createElement( "checkbox-select" );

        testingWrapper.appendChild( checkSelect );
        testingWrapper.removeChild( checkSelect );

        expect( testingWrapper )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( originalWrapperOuterHTML );

        resetWrapper();
      });
    });

    suite( "Attributes and Properties", function() {
      // Tests for Value attribute and property
      suite( "value", function() {
        test( "can be set via setattribute", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Attribute";

          checkSelect.setAttribute( "value", setTo );

          expect( checkSelect.hasAttribute( "value" ) ).to.equal( true );

          expect( checkSelect.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.equals( "<checkbox-select value=\"" + setTo + "\"></checkbox-select>" );
        });

        test( "can be set via property \"value\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Property";

          checkSelect.value = setTo;

          expect( checkSelect )
            .to.have.property( "value" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"value\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Attribute";

          checkSelect.setAttribute( "value", setTo );

          expect( checkSelect )
            .to.have.property( "value" )
            .that.equals( setTo )
            .and.equals( checkSelect.getAttribute( "value" ) );
        });

        test( "setting via property \"value\" reflects to attribute \"value\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Property";

          checkSelect.value = setTo;

          expect( checkSelect.hasAttribute( "value" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( checkSelect.value );
        });
      });

      // Tests for Name attribute and property
      suite( "name", function() {
        test( "can be set via setattribute", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Attribute";

          checkSelect.setAttribute( "name", setTo );

          expect( checkSelect.hasAttribute( "name" ) ).to.equal( true );

          expect( checkSelect.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.equals( "<checkbox-select name=\"" + setTo + "\"></checkbox-select>" );
        });

        test( "can be set via property \"name\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Property";

          checkSelect.name = setTo;

          expect( checkSelect )
            .to.have.property( "name" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"name\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Attribute";

          checkSelect.setAttribute( "name", setTo );

          expect( checkSelect )
            .to.have.property( "name" )
            .that.equals( setTo )
            .and.equals( checkSelect.getAttribute( "name" ) );
        });

        test( "setting via property \"name\" reflects to attribute \"name\"", function() {
          var checkSelect = document.createElement( "checkbox-select" ),
              setTo = "Set via Property";

          checkSelect.name = setTo;

          expect( checkSelect.hasAttribute( "name" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( checkSelect.name );
        });
      });

      // Tests for Required attribute and property
      suite( "required", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "checkbox-select" ) )
            .to.have.property( "required" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "required", "" );

          expect( checkSelect.hasAttribute( "required" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select required=\"\"></checkbox-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "required", "" );

          expect( checkSelect )
            .to.have.property( "required" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.required = true;

          expect( checkSelect.hasAttribute( "required" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "required", "" );
          checkSelect.removeAttribute( "required" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.required = true;
          checkSelect.removeAttribute( "required" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "required", "" );
          checkSelect.required = false;

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });
      });

      // Tests for checked attribute and property
      suite( "checked", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "checkbox-select" ) )
            .to.have.property( "checked" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "checked", "" );

          expect( checkSelect.hasAttribute( "checked" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "checked" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select checked=\"\"></checkbox-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "checked", "" );

          expect( checkSelect )
            .to.have.property( "checked" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.checked = true;

          expect( checkSelect.hasAttribute( "checked" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "checked" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "checked", "" );
          checkSelect.removeAttribute( "checked" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.checked = true;
          checkSelect.removeAttribute( "checked" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "checked", "" );
          checkSelect.checked = false;

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });
      });

      // Tests for disabled attribute and property
      suite( "disabled", function() {
        test( "has default value: false", function() {
          expect( document.createElement( "checkbox-select" ) )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "disabled", "" );

          expect( checkSelect.hasAttribute( "disabled" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select disabled=\"\"></checkbox-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "disabled", "" );

          expect( checkSelect )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.checked = true;

          expect( checkSelect.hasAttribute( "disabled" ) ).to.equal( true );
          expect( checkSelect.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "disabled", "" );
          checkSelect.removeAttribute( "disabled" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via attribute reflect property", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.disabled = true;
          checkSelect.removeAttribute( "disabled" );

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var checkSelect = document.createElement( "checkbox-select" );

          checkSelect.setAttribute( "disabled", "" );
          checkSelect.checked = false;

          expect( checkSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<checkbox-select></checkbox-select>" );
        });
      });
    });
  });
})( window, document, window.chai );
