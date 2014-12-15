( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {
    // current value
    get progressValue() {
      return this._progressValue;
    },
    set progressValue( value ) {
      this.attributes.value.value = value;

      return ( this._progressValue = value );
    },
    // max value
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
    // show value
    get showValue() {
      return this._showValue;
    },
    set showValue( value ) {
      this.attributes["show-value"].value = value;

      return ( this._showValue = value );
    },
    // percentage
    get pbVal() {
      return this._pbVal;
    },
    set pbVal( value ) {
      return ( this._pbVal = value );
    },
    ready: function() {
      var innerBar = this.shadowRoot.getElementById( "inner-bar" );
      // value and max
      this.progressValue = parseInt( this.attributes.value.value );

      // checks if attribute is an integer
      if ( this.attributes.max ) {
        this.progressMax = parseInt( this.attributes.max.value ) && typeof parseInt( this.attributes.max.value ) == "number" ? parseInt( this.attributes.max.value ) : 100;
      } else {
        this.progressMax = 100;
      }
      // percentage conversion
      if ( this.progressValue < this.progressMax ) {
        this.pbVal = Math.round( ( this.progressValue * 100 ) / ( this.progressMax ) );
      } else {
        alert( " Value is larger than Max " );
      }

      innerBar.style.width = this._pbVal + "%" ;
      // show and hide value
      //this.showValue = this.attributes["show-value"].value;
      console.log( this.attributes["show-value"] );

    }
  });
})( window.Polymer );
