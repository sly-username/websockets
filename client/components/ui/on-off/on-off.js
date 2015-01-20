( function( Polymer ) {
  "use strict";
  var copyAttributes = function( elemFrom, elemTo, attrs ) {
    attrs.forEach( function( attr ) {
      if ( elemFrom.hasAttribute( attr ) ) {
        elemTo.setAttribute( attr, elemFrom.getAttribute( attr ) );
      } else {
        elemTo.removeAttribute( attr );
      }
    });
  };

  Polymer( "on-off", {
    get onText() {
      return this._onText;
    },
    set onText( value ) {
      this.attributes[ "on-text" ].value = value;
      this._onText = value;
      return value;
    },
    get offText() {
      return this._offText;
    },
    set offText( value ) {
      this.attributes[ "off-text" ].value = value;
      this._offText = value;
      return value;
    },
    ready: function() {
      // on-text off-text
      var checkedBox = this.shadowRoot.getElementById( "checkbox" );

      if ( this.attributes[ "on-text" ] ) {
        this.onText = this.attributes[ "on-text" ].value;
      }

      if ( this.attributes[ "on-text" ] ) {
        this.offText = this.attributes[ "off-text" ].value;
      }

      copyAttributes( this, checkedBox, [ "checked", "disabled" ]);
    },
    attached: function() {
      var self = this,
          toggle = self.shadowRoot.querySelector( "input[type=checkbox]" );

      toggle.addEventListener( "change", function() {
        var state = toggle.checked ? "on" : "off";

        /*jscs:disable requirePaddingNewLinesInObjects*/
        self.fire( "toggle", { msg: "toggle" });
        self.fire( state, { msg: state });
        /*jscs:enable */
      });
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      var checkbox = this.shadowRoot.getElementById( "checkbox" );

      switch ( attrName ) {
        case "on-text":
          this.onText = newVal;
          break;
        case "off-text":
          this.offText = newVal;
          break;
        case "disabled":
          // fallthrough
        case "checked":
          checkbox[ newVal == null ? "removeAttribute" : "setAttribute" ]( attrName, "" );
          break;
        default:
          // do nothing
          break;
      }
    }
  });
})( window.Polymer );
