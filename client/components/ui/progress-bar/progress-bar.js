( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {
    get progressValue() {
      return this._progressValue;
    },
    set progressValue( value ) {
      this.attributes.value.value = value;

      return ( this._progressValue = value );
    },
    get progressMax() {
      return this._progressMax;
    },
    set progressMax( value ) {
      if ( this.attributes.max ) {
        this.attributes.max.value = value;

        return ( this._progressMax = value );
      } else {
        return ( this._progressMax = 100 );
      }
    },
    get pbVal() {
      return this._pbVal;
    },
    set pbVal( value ) {
      return ( this._pbVal = value );
    },
    ready: function() {
      var innerBar = this.shadowRoot.getElementById( "inner-bar" );
      var progressDisplay = this.shadowRoot.getElementById( "progress-display" );
      // value and max
      this.progressValue = parseInt( this.attributes.value.value );

      if ( this.attributes.max ) {
        this.progressMax = parseInt( this.attributes.max.value ) && typeof parseInt( this.attributes.max.value ) == "number" ? parseInt( this.attributes.max.value ) : 100;
      } else {
        this.progressMax = 100;
      }

      if ( this.progressValue < this.progressMax ) {
        this.pbVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
      } else {
        alert( " Value is larger than Max " );
      }

      innerBar.style.width = this._pbVal + "%" ;

      //show and hide value

      //copyAttributes(this, checkedBox, ["checked", "disabled"]);
      //var copyAttributes = function (this, progressDisplay, attrs) {
      //  attrs.forEach(function (attr) {
      //    if ( this.hasAttribute(attr) ) {
      //      progressDisplay.setAttribute(attr, this.getAttribute(attr));
      //    } else {
      //      progressDisplay.removeAttribute(attr);
      //    }
      //  });
      //};
    }
  });
})( window.Polymer );
