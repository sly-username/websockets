/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect;

  suite( "<flip-box>", function() {
    var element;
    setup( function() {
      element = document.createElement( "flip-box" );
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
          .and.equals( "<flip-box></flip-box>" );

        div.removeChild( element );
        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes", function() {
      // Tests for Value attribute and property
      suite( "animation", function() {
        test( "can be set via setAttribute", function() {
          var flipBox = newFlipBox(),
              setTo = "Set via Attribute";

          flipBox.setAttribute( "animation", setTo );

          expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );

          expect( flipBox.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( flipBox )
            .to.have.property( "outerHTML" )
            .that.equals( "<flip-box value=\"" + setTo + "\"></flip-box>" );
        });

        test( "can be set via property \"animation\"", function() {
          var flipBox = newFlipBox(),
              setTo = "Set via Property";

          flipBox.value = setTo;

          expect( flipBox )
            .to.have.property( "value" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"animation\"", function() {
          var flipBox = newFlipBox(),
              setTo = "Set via Attribute";

          flipBox.setAttribute( "value", setTo );

          expect( flipBox )
            .to.have.property( "animation" )
            .that.equals( setTo )
            .and.equals( flipBox.getAttribute( "animation" ) );
        });

        test( "setting via property \"animation\" reflects to attribute \"animation\"", function() {
          var flipBox = newFlipBox(),
              setTo = "Set via Property";

          flipBox.value = setTo;

          expect( flipBox.hasAttribute( "animation" ) ).to.equal( true );
          expect( flipBox.getAttribute( "animation" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( flipBox.value );
        });
      });


      suite( "Events", function() {
      test( "customEvent", function( done ) {});
    });
  });
})( window, document, window.chai );
