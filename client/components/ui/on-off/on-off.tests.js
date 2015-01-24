/*globals CustomEvent */
/*eslint-env mocha */
( function( window, document, chai ) {
  "use strict";
  var expect = chai.expect,
    newOnOff = function() {
      return document.createElement( "on-off" );
    };

  suite( "<on-off>", function() {
    suite( "Life Cycle", function() {
      test( "ready: can create from document.createElement", function() {
        expect( document.createElement( "on-off" ) )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );
      });

      test( "attached: can be added to another DOM Element", function() {
        var onOff = newOnOff(),
          div = document.createElement( "div" );

        div.appendChild( onOff );

        expect( div )
          .to.have.property( "innerHTML" )
          .that.is.a( "string" )
          .and.equals( "<on-off></on-off>" );
      });

      test( "detached: can be removed from another DOM element", function() {
        var onOff = newOnOff(),
          div = document.createElement( "div" );

        div.appendChild( onOff );
        div.removeChild( onOff );

        expect( div )
          .to.have.property( "outerHTML" )
          .that.is.a( "string" )
          .and.equals( "<div></div>" );
      });
    });

    suite( "Attributes & Associated Properties", function() {
      suite( "on-text / onText", function() {
        test( "has default value: \"On\"", function() {
          expect( newOnOff() )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( "On" );
        });

        test( "can be set via \"setAttribute\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "on-text", setTo );

          expect( onOff.hasAttribute( "on-text" ) ).to.equal( true );

          expect( onOff.getAttribute( "on-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( onOff )
            .to.have.property( "outerHTML" )
            .that.equals( "<on-off on-text=\"" + setTo + "\"></on-off>" );
        });

        test( "can be set via property \"onText\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.onText = setTo;

          expect( onOff )
            .to.have.property( "onText" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"onText\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "on-text", setTo );

          expect( onOff )
            .to.have.property( "onText" )
            .that.equals( setTo )
            .and.equals( onOff.getAttribute( "on-text" ) );
        });

        test( "setting via property \"onText\" reflects to attribute \"on-text\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.onText = setTo;

          expect( onOff.hasAttribute( "on-text" ) ).to.equal( true );
          expect( onOff.getAttribute( "on-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( onOff.onText );
        });

        test( "removing attribute \"on-text\" sets property back to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "on-text", setTo );
          expect( onOff.hasAttribute( "on-text" ) ).to.equal( true );

          onOff.removeAttribute( "on-text" );
          expect( onOff.hasAttribute( "on-text" ) ).to.equal( false );

          expect( onOff )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( "On" );
        });

        test( "setting \"onText\" to null resets property to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.onText = setTo;
          expect( onOff )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          onOff.onText = null;
          expect( onOff )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });

        test( "setting \"onText\" to undefined resets property to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.onText = setTo;
          expect( onOff )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          onOff.onText = undefined;
          expect( onOff )
            .to.have.property( "onText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });
      });

      suite( "off-text / offText", function() {
        test( "has default value: \"Off\"", function() {
          expect( newOnOff() )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( "Off" );
        });

        test( "can be set via \"setAttribute\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "off-text", setTo );

          expect( onOff.hasAttribute( "off-text" ) ).to.equal( true );

          expect( onOff.getAttribute( "off-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo );

          expect( onOff )
            .to.have.property( "outerHTML" )
            .that.equals( "<on-off off-text=\"" + setTo + "\"></on-off>" );
        });

        test( "can be set via property \"offText\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.offText = setTo;

          expect( onOff )
            .to.have.property( "offText" )
            .that.equals( setTo );
        });

        test( "setting via \"setAttribute\" reflects to property \"offText\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "off-text", setTo );

          expect( onOff )
            .to.have.property( "offText" )
            .that.equals( setTo )
            .and.equals( onOff.getAttribute( "off-text" ) );
        });

        test( "setting via property \"offText\" reflects to attribute \"off-text\"", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.offText = setTo;

          expect( onOff.hasAttribute( "off-text" ) ).to.equal( true );
          expect( onOff.getAttribute( "off-text" ) )
            .to.be.a( "string" )
            .that.equals( setTo )
            .and.equal( onOff.offText );
        });

        test( "removing attribute \"off-text\" sets property back to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Attribute";

          onOff.setAttribute( "off-text", setTo );
          expect( onOff.hasAttribute( "off-text" ) ).to.equal( true );

          onOff.removeAttribute( "off-text" );
          expect( onOff.hasAttribute( "off-text" ) ).to.equal( false );

          expect( onOff )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( "Off" );
        });

        test( "setting \"offText\" to null resets property to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.offText = setTo;
          expect( onOff )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          onOff.offText = null;
          expect( onOff )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });

        test( "setting \"offText\" to undefined resets property to default value", function() {
          var onOff = newOnOff(),
            setTo = "Set via Property";

          onOff.offText = setTo;
          expect( onOff )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( setTo );

          onOff.offText = undefined;
          expect( onOff )
            .to.have.property( "offText" )
            .that.is.a( "string" )
            .and.equals( setTo );
        });
      });

      suite( "checked / checked", function() {
        test( "has default value: false", function() {
          var onOff = newOnOff();

          // Check default setup
          expect( onOff )
            .to.have.property( "checked" )
            .that.is.a( "boolean" )
            .and.equals( false );
        });

        test( "can be set via \"setAttribute\"", function() {
          var onOff = newOnOff();

          // Set to be checked
          onOff.setAttribute( "checked", "" );
          expect( onOff.hasAttribute( "checked" ) ).to.equal( true );
          expect( onOff.getAttribute( "checked" ) )
            .to.be.a( "string" )
            .and.equal( "" );
        });

        // TODO
        test( "can be set via property \"checked\"", function() {});

        test( "setting via attribute reflects to property", function() {});

        test( "setting via property reflects to attribute", function() {});

        // remove attribute sets to false
        test( "removing attribute reflects to attribute", function() {});

        test( "setting property to false removes attribute", function() {});

        test( "old tests: ", function() {
          var element = newOnOff();

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
      });

      suite( "disabled", function() {
        test( "Still To Do", function() {
          var element = newOnOff();

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

      test( "on event fires when checked property changed", function( done ) {
        var element = newOnOff();
        element.checked = false;

        element.addEventListener( "on", function( event ) {
          console.log( "on fired", event );
          expect( event )
            .to.be.an.instanceof( CustomEvent )
            .and.to.have.property( "target", element )
            .and.to.have.property( "srcElement", element )
            .and.to.have.property( "type", "on" )
            .and.to.have.deep.property( "detail.msg", "on" );

          done();
        });

        // should fire "on" and "toggle" event
        element.checked = true;
      });

      test( "off", function( done ) {
        var element = newOnOff();
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
