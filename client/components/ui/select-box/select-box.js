( function( Polymer ) {
  "use strict";

  Polymer( "select-box", {
    _options: [],
    /*** PROPERTIES ***/
    // Disabled
    get disabled() {
      if ( !null ) {
        return this._disabled;
      }
    },
    set disabled( value ) {
      if ( value !== null ) {
        this.setAttribute( "disabled", value );

        return ( this._disabled = value );
      }
    },
    get selectedIndex() {
      var i;

      for ( i = 0; i < this.listItems.length; i++ ) {
        if ( this.listItems[i].children[0].checked ) {
          return i;
        }
      }
    },
    set selectedIndex( value ) {
      this.listItems[ parseInt( value, 10 ) ].children[0].checked = true;
    },
    get value() {
      var i;

      for ( i = 0; i < this.listItems.length; i++ ) {
        if ( this.listItems[i].children[0].checked ) {
          return this.listItems[i].children[0].value;
        }
      }
    },
    /*** END PROPERTIES ***/
    /*** LIFECYCLE ***/
    ready: function() {
      //this.testStuff = this.shadowRoot.getElementById( "test" );
      this.listItems = this.shadowRoot.getElementsByTagName( "li" );
      this.getOptions = this.shadowRoot.getElementsByClassName( "options" )[0];
      this.getOptions.style.maxHeight = ( this.size * 32.4 ) + "px";
      //// required attribute
      //if ( this.hasAttribute( "required" ) ) {
      //  this.testStuff.required;
      //
      //}
    },
    created: function() {
      Array.prototype.forEach.call( this.children, function( elem ) {
        this._options.push({
          value: elem.value,
          label: elem.getAttribute( "label" ) || elem.textContent,
          selected: elem.selected
        });
      }.bind( this ) );
    },
    /*** END LIFECYCLE ***/
    /*** FUNCTIONS ***/
    sizeChanged: function( oldVal, newVal ) {
      this.size = newVal;
      this.setAttribute( "size", newVal );
      this.getOptions.style.maxHeight = ( newVal * 32.4 ) + "px";
    },
    // Listens for disabled
    disabledChanged: function( oldVal, newVal ) {
      this.disabled = newVal;
      this.setAttribute( "disabled", newVal );
    }
    /*** END FUNCTIONS ***/
  });
})( window.Polymer );
