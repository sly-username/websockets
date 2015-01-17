/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect;

  suite( "<on-off>", function() {
    var element;
    setup( function() {
      element = document.createElement( "on-off" );
    });

    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( element )
          .to.have.property( "outerHTML" )
          .that.equals( "<on-off></on-off>" );
      });

      test( "attached/detached: can be added/removed to/from the DOM", function() {
        var div = document.createElement( "div" );
        div.appendChild( element );
        expect( div )
          .to.have.property( "innerHTML" )
          .that.equals( "<on-off></on-off>" );

        div.removeChild( element );
        expect( div )
          .to.have.property( "outerHTML" )
          .that.equals( "<div></div>" );
      });
    });

    suite( "Attributes", function() {
      test( "on-text", function() {
//        element.onText = "New-Text";
        expect( element )
          .to.have.property( "onText" )
          .that.equals( "New-Text" );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.equals( "<on-off on-text=\"New-Text\"></on-off>" );
      });

      test( "off-text", function() {
        var div = document.createElement( "div" );
        div.innerHTML = "<on-off off-text=\"New-Text\"></on-off>";
        expect( div.children[0] )
          .to.have.property( "offText" )
          .that.equals( "New-Text" );
      });
    });
  });
})( window, document, window.chai );
