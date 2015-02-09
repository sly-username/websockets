( function( Polymer ) {
  "use strict";
  //var copyAttributes = function( elemFrom, elemTo, attrs ) {
  //  attrs.forEach( function( attr ) {
  //    if ( elemFrom.hasAttribute( attr ) ) {
  //      elemTo.setAttribute( attr, elemFrom.getAttribute( attr ) );
  //    } else {
  //      elemTo.removeAttribute( attr );
  //    }
  //  });
  //};

  Polymer( "on-off", {
    //get onText() {
    //  return this._onText;
    //},
    //set onText( value ) {
    //  this.attributes[ "on-text" ].value = value;
    //  this._onText = value;
    //  return value;
    //},
    //get offText() {
    //  return this._offText;
    //},
    //set offText( value ) {
    //  this.attributes[ "off-text" ].value = value;
    //  this._offText = value;
    //  return value;
    //},
    //ready: function() {
    //  // on-text off-text
    //  var checkedBox = this.shadowRoot.getElementById( "checkbox" );
    //
    //  if ( !this.attributes[ "on-text" ] ) {
    //    this.onText = "on";
    //  }
    //
    //  if ( this.attributes[ "on-text" ] ) {
    //    this.offText = this.attributes[ "off-text" ].value;
    //  }
    //
    //  copyAttributes( this, checkedBox, [ "checked", "disabled" ]);
    //},

    //attributeChanged: function( attrName, oldVal, newVal ) {
    //  var checkbox = this.shadowRoot.getElementById( "checkbox" );
    //
    //  switch ( attrName ) {
    //    case "on-text":
    //
    //      if ( !this.attributes[ "on-text" ] ) {
    //        this.onText = "on";
    //        this.setAttribute( "on-text", "on" );
    //        console.log( "no hit" );
    //      } else {
    //        this.onText = newVal;
    //        this.setAttribute( "on-text", newVal );
    //        console.log( "hit" );
    //      }
    //      break;
    //    case "off-text":
    //      this.offText = newVal;
    //      break;
    //    case "disabled":
    //      // fallthrough
    //    case "checked":
    //      checkbox[ newVal == null ? "removeAttribute" : "setAttribute" ]( attrName, "" );
    //      break;
    //    default:
    //      // do nothing
    //      break;
    //  }
    //}

    //ready: function() {
    //  if ( !this.hasAttribute( "on-text" ) ) {
    //    this.onText = "on";
    //    this.setAttribute( "on-text", "on" );
    //  }
    //},

    disabled: false,
    checked: false,
    publish: {
      "on-text": {
        value: "On",
        reflect: true
      },
      "off-text": {
        value: "Off",
        reflect: true
      },
      checked: {
        reflect: true
      },
      disabled: {
        reflect: true
      }
    },
    get onText() {
      return this["on-text"];
    },
    set onText( value ) {
      if ( value == null ) {
        value = "On";
      }
      return this["on-text"] = value;
    },
    get offText() {
      return this["off-text"];
    },
    set offText( value ) {
      if ( value == null ) {
        value = "Off";
      }
      return this["off-text"] = value;
    },
    ready: function() {
      this.onText = this["on-text"];
      this.offText = this["off-text"];
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      //switch ( attrName ) {
      //  case "checked":
      //    this.checked = newVal;
      //    break;
      //  case "disabled":
      //    this.disabled = newVal
      //  default:
      //    // do nothing
      //    break;
      //}

      if ( newVal == null && ( /^(on|off)/ ).test( attrName ) ) {
        this[attrName] = this.publish[attrName].value;
        return;
      }
    },
    attached: function() {
      var self = this,
          toggle = self.shadowRoot.querySelector( "input[type=checkbox]" );

      toggle.addEventListener( "change", function() {
        var state = toggle.checked ? "on" : "off";

        self.fire( "toggle", { msg: "toggle" });
        self.fire( state, { msg: state });
      });
    },
    checkedChanged: function() {

      if( this.checked = true ) {
        this.fire("on", { msg: "on" });
      }
    }
  });
})( window.Polymer );
