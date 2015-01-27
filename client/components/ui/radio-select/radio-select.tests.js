/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
      newRadioSelect = function() {
        return document.createElement( "radio-select" );
      };

  suite( "<radio-select>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "radio-select" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<radio-select></radio-select>" );
      });

      test( "attached: can be added to the DOM", function() {
        var radioSelect = newRadioSelect(),
            div = document.createElement( "div" );

        div.appendChild( radioSelect );

        expect( div )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<radio-select></radio-select>" );
      });

      test( "detached: can be removed from another Dom element", function() {
        var radioSelect = newRadioSelect(),
            div = document.createElement( "div" );

        div.appendChild( radioSelect );
        div.removeChild( radioSelect );

        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes and Properties", function() {

      // Tests for Value attribute and property
      suite( "value", function() {
        test( "can be set via setattribute", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Attribute";

          radioSelect.setAttribute( "value", setTo );

          expect( radioSelect.hasAttribute( "value" ) ).to.equal( true );

          expect( radioSelect.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.equals( "<radio-select value=\"" + setTo + "\"></radio-select>" );
        });

        test( "can be set via property \"value\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Property";

          radioSelect.value = setTo;

          expect( radioSelect )
            .to.have.property( "value" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"value\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Attribute";

          radioSelect.setAttribute( "value", setTo );

          expect( radioSelect )
            .to.have.property( "value" )
            .that.equals( setTo )
            .and.equals( radioSelect.getAttribute( "value" ) );
        });

        test( "setting via property \"value\" reflects to attribute \"value\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Property";

          radioSelect.value = setTo;

          expect( radioSelect.hasAttribute( "value" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "value" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( radioSelect.value );
        });
      });

      // Tests for Name attribute and property
      suite( "name", function() {
        test( "can be set via setattribute", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Attribute";

          radioSelect.setAttribute( "name", setTo );

          expect( radioSelect.hasAttribute( "name" ) ).to.equal( true );

          expect( radioSelect.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.equals( "<radio-select name=\"" + setTo + "\"></radio-select>" );
        });

        test( "can be set via property \"value\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Property";

          radioSelect.name = setTo;

          expect( radioSelect )
            .to.have.property( "name" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"name\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Attribute";

          radioSelect.setAttribute( "name", setTo );

          expect( radioSelect )
            .to.have.property( "name" )
            .that.equals( setTo )
            .and.equals( radioSelect.getAttribute( "name" ) );
        });

        test( "setting via property \"value\" reflects to attribute \"name\"", function() {
          var radioSelect = newRadioSelect(),
              setTo = "Set via Property";

          radioSelect.value = setTo;

          expect( radioSelect.hasAttribute( "name" ) ).to.equal( true );;
          expect( radioSelect.getAttribute( "name" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( radioSelect.name );
        });
      });

      // Tests for Required attribute and property
      suite( "required", function() {
        test( "has default value: false", function() {
          var radioSelect = newRadioSelect();

          expect( radioSelect )
            .to.have.property( "required" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "required", "" );

          expect( radioSelect.hasAttribute( "required" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select required=\"\"></radio-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "required", "" );

          expect( radioSelect )
            .to.have.property( "required" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.required = true;

          expect( radioSelect.hasAttribute( "required" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "required" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function(){
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "required", "" );
          radioSelect.removeAttribute( "required" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via attribute reflect property", function(){
          var radioSelect = newRadioSelect();

          radioSelect.required = true;
          radioSelect.removeAttribute( "required" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "required", "" );
          radioSelect.required = false;

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });
      });

      // Tests for checked attribute and property
      suite( "checked", function() {
        test( "has default value: false", function() {
          var radioSelect = newRadioSelect();

          expect( radioSelect )
            .to.have.property( "checked" )
            .that.is.a( "boolean" )
            .and.equals( false );
        })

        test( "can be set via attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "checked", "" );

          expect( radioSelect.hasAttribute( "checked" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "checked" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select checked=\"\"></radio-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "checked", "" );

          expect( radioSelect )
            .to.have.property( "checked" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.checked = true;

          expect( radioSelect.hasAttribute( "checked" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "checked" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function(){
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "checked", "" );
          radioSelect.removeAttribute( "checked" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via attribute reflect property", function(){
          var radioSelect = newRadioSelect();

          radioSelect.checked = true;
          radioSelect.removeAttribute( "checked" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "checked", "" );
          radioSelect.checked = false;

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });
      });

      // Tests for disabled attribute and property
      suite( "disabled", function() {
        test( "has default value: false", function() {
          var radioSelect = newRadioSelect();

          expect( radioSelect )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( false );
        })

        test( "can be set via attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "disabled", "" );

          expect( radioSelect.hasAttribute( "disabled" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select disabled=\"\"></radio-select>" );
        });

        test( "can be set via attribute reflect property", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "disabled", "" );

          expect( radioSelect )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.equals( true );
        });

        test( "can be set via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.checked = true;

          expect( radioSelect.hasAttribute( "disabled" ) ).to.equal( true );
          expect( radioSelect.getAttribute( "disabled" ) )
            .to.be.a( "string" )
            .and.equals( "" );
        });

        test( "can be removed via attribute", function(){
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "disabled", "" );
          radioSelect.removeAttribute( "disabled" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via attribute reflect property", function(){
          var radioSelect = newRadioSelect();

          radioSelect.disabled = true;
          radioSelect.removeAttribute( "disabled" );

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });

        test( "can be removed via property reflect attribute", function() {
          var radioSelect = newRadioSelect();

          radioSelect.setAttribute( "disabled", "" );
          radioSelect.checked = false;

          expect( radioSelect )
            .to.have.property( "outerHTML" )
            .that.is.a( "string" )
            .and.equals( "<radio-select></radio-select>" );
        });
      });
    });

    suite( "Events", function() {
      test( "uncheck other <radio-select> elements when one is checked", function() {
        var radioSelect = newRadioSelect(),
            radioDupe = newRadioSelect();

        radioDupe.setAttribute( "checked", "" );
        radioSelect.setAttribute( "checked", "" );

        expect( radioDupe )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<radio-select></radio-select>" );
      });
    });
  });
})( window, document, window.chai );
