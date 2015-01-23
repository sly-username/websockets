/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect;

  suite( "<flip-box>", function() {
    var element;
    setup( function() {
      element = document.createElement( "new-element" );
    });

    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<flip-box></flip-box>" );
      });

      test( "attached/detached: can be added/removed to/from the DOM", function() {
        var div = document.createElement( "div" );
        div.appendChild( element );

        expect( div )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<new-element></new-element>" );

        div.removeChild( element );
        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes", function() {
      test( "data-text", function() {});
    });

    suite( "Events", function() {
      test( "customEvent", function( done ) {});
    });
  });
})( window, document, window.chai );
