/*globals CustomEvent */
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
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );
      });

      test( "attached/detached: can be added/removed to/from the DOM", function() {
        var div = document.createElement( "div" );
        div.appendChild( element );

        expect( div )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );

        div.removeChild( element );
        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes", function() {
      test( "on-text", function() {
        expect( element )
          .to.have.property( "onText" )
          .that.is.a( "string" )
          .and.equals( "On" );

        // Set on-text with setAttribute
        element.setAttribute( "on-text", "setAttribute" );

        expect( element.hasAttribute( "on-text" ) )
          .to.true();

        expect( element.getAttribute( "on-text" ) )
          .to.be.a( "string" )
          .and.equal( "setAttribute" );

        expect( element )
          .to.have.property( "onText" )
          .that.is.a( "string" )
          .and.equals( element.getAttribute( "on-text" ) );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off on-text=\"setAttribute\"></on-off>" );

        // set using onText setter
        expect( element.onText = "setProperty" )
          .to.be.a( "string" )
          .and.equal( "setProperty" );

        expect( element )
          .to.have.property( "onText" )
          .that.is.a( "string" )
          .and.equals( "setProperty" );

        expect( element )
          .to.have.property( "onText" )
          .that.is.a( "string" )
          .and.equals( element.getAttribute( "on-text" ) );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off on-text=\"setProperty\"></on-off>" );
      });

      test( "off-text", function() {
        expect( element )
          .to.have.property( "offText" )
          .that.is.a( "string" )
          .and.equals( "Off" );

        element.setAttribute( "off-text", "setAttribute" );

        expect( element.hasAttribute( "off-text" ) )
          .to.be.true();

        expect( element.getAttribute( "off-text" ) )
          .to.be.a( "string" )
          .and.equal( "setAttribute" );

        expect( element )
          .to.have.property( "offText" )
          .that.is.a( "string" )
          .and.equals( element.getAttribute( "off-text" ) );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off off-text=\"setAttribute\"></on-off>" );

        expect( element.offText = "setProperty" )
          .to.be.a( "string" )
          .and.equal( "setProperty" );

        expect( element )
          .to.have.property( "offText" )
          .that.is.a( "string" )
          .and.equals( "setProperty" );

        expect( element )
          .to.have.property( "offText" )
          .that.is.a( "string" )
          .and.equals( element.getAttribute( "off-text" ) );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off off-text=\"setProperty\"></on-off>" );
      });

      test( "checked", function() {
        // Check default setup
        expect( element )
          .to.have.property( "checked" )
          .that.is.a( "boolean" )
          .and.equals( false );

        // Set to be checked
        element.setAttribute( "checked", "" );
        expect( element )
          .to.have.property( "checked" )
          .that.is.a( "boolean" )
          .and.equals( true );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off checked=\"\"></on-off>" );

        element.removeAttribute( "checked" );
        expect( element )
          .to.have.property( "checked" )
          .that.is.a( "boolean" )
          .and.equals( false );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );

        element.checked = true;
        expect( element )
          .to.have.property( "checked" )
          .that.is.a( "boolean" )
          .and.equals( true );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off checked=\"\"></on-off>" );

        element.checked = false;
        expect( element )
          .to.have.property( "checked" )
          .that.is.a( "boolean" )
          .and.equals( false );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );
      });

      test( "disabled", function() {
        // Check default setup
        expect( element )
          .to.have.property( "disabled" )
          .that.is.a( "boolean" )
          .and.equals( false );

        // Set to be disabled
        element.setAttribute( "disabled", "" );
        expect( element )
          .to.have.property( "disabled" )
          .that.is.a( "boolean" )
          .and.equals( true );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off disabled=\"\"></on-off>" );

        element.removeAttribute( "disabled" );
        expect( element )
          .to.have.property( "disabled" )
          .that.is.a( "boolean" )
          .and.equals( false );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );

        element.disabled = true;
        expect( element )
          .to.have.property( "disabled" )
          .that.is.a( "boolean" )
          .and.equals( true );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off disabled=\"\"></on-off>" );

        element.disabled = false;
        expect( element )
          .to.have.property( "disabled" )
          .that.is.a( "boolean" )
          .and.equals( false );

        expect( element )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );
      });
    });

    suite( "Events", function() {
      var countEvents;
      setup( function() {
        countEvents = ( function() {
          var count = 0;
          return function() {
            count += 1;
            return count;
          };
        })();
      });

      test( "on + toggle", function( done ) {
        element.checked = false;

        element.addEventListener( "on", function( event ) {
          console.log( "on fired", event );
          expect( event )
            .to.be.an.instanceof( CustomEvent )
            .and.to.have.property( "target", element )
            .and.to.have.property( "srcElement", element )
            .and.to.have.property( "type", "on" )
            .and.to.have.deep.property( "detail.msg", "on" );

          if ( countEvents() === 2 ) {
            done();
          }
        });

        element.addEventListener( "toggle", function( event ) {
          console.log( "toggle(on) fired", event );
          expect( event )
            .to.be.an.instanceof( CustomEvent )
            .and.to.have.property( "target", element )
            .and.to.have.property( "srcElement", element )
            .and.to.have.property( "type", "toggle" )
            .and.to.have.deep.property( "detail.msg", "toggle" );

          if ( countEvents() === 2 ) {
            done();
          }
        });

        // should fire "on" and "toggle" event
        element.checked = true;
      });

      test( "off", function( done ) {
        element.checked = true;

        element.addEventListener( "off", function( event ) {
          console.log( "off fired", event );
          expect( event )
            .to.be.an.instanceof( CustomEvent )
            .and.to.have.property( "target", element )
            .and.to.have.property( "srcElement", element )
            .and.to.have.property( "type", "off" )
            .and.to.have.deep.property( "detail.msg", "off" );

          if ( countEvents() === 2 ) {
            done();
          }
        });

        element.addEventListener( "toggle", function( event ) {
          console.log( "toggle(off) fired", event );
          expect( event )
            .to.be.an.instanceof( CustomEvent )
            .and.to.have.property( "target", element )
            .and.to.have.property( "srcElement", element )
            .and.to.have.property( "type", "toggle" )
            .and.to.have.deep.property( "detail.msg", "off" );

          if ( countEvents() === 2 ) {
            done();
          }
        });

        // should fire "off" and "toggle" events
        element.checked = false;
      });
    });
  });
})( window, document, window.chai );
