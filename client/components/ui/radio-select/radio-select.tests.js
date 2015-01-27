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

    suite( "Attributes", function() {
      test( "data-text", function() {});
    });
  });
})( window, document, window.chai );
