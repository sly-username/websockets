/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect;

  // THIS IS THE OLD VERSION
  // PLEASE UPDATE THIS TO MATCH THE NEW STUFF IN
  // .new/new-element.tests.js OR USE THE <on-off> TESTS
  // AS A REFERENCE

  suite( "<select-box>", function() {
    var element;
    setup( function() {
      element = document.createElement( "select-box" );
    });

    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<select-box></select-box>" );
      });

      test( "attached/detached: can be added/removed to/from the DOM", function() {
        var div = document.createElement( "div" );
        div.appendChild( element );

        expect( div )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<select-box></select-box>" );

        div.removeChild( element );
        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes", function() {
      suite( "size", function() {
        test( "has default value", function() {
          expect( element )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 5 );
        });

        test( "can be set via a property + reflection", function() {
          element.size = 10;

          expect( element )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 10 );

          expect( element.getAttribute( "size" ) )
            .to.be.a( "string" )
            .and.equals( "10" );
        });

        test( "can be set via setAttribute + reflection", function() {
          element.setAttribute( "size", 8 );

          expect( element.getAttribute( "size" ) )
            .that.is.a( "string" )
            .and.equals( "8" );

          expect( element )
            .to.have.property( "size" )
            .that.is.a( "number" )
            .and.equals( 8 );
        });
      });

      suite( "disabled", function() {
        test( "has default value", function() {
          expect( element )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.is.false();
        });

        test( "can be set via a property + reflection", function() {
          element.disabled = true;

          expect( element )
            .to.have.property( "disabled" )
            .that.is.a( "boolean" )
            .and.is.true();

          expect( element.hasAttribute( "disabled" ) )
            .to.be.ok();
        });
      });
    });
  });
})( window, document, window.chai );
