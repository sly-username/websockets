( function( Polymer ) {
  "use strict";

  Polymer( "progress-bar", {
    get progressValue() {
      return this._progressValue;
    },
    set progressValue( value ) {
      this.attributes[" value "].value = value;
      return ( this._progressValue = value );
    },
    get progressMax() {
      return this._progressMax;
    },
    set progressMax( value ) {
      if( this.attributes[" max "] ) {
        this.attributes[ "max" ].value = value;
        return (this._progressMax = value);
      } else {
        return (this._progressMax = 100);
      }
    },
    get pbVal(){
      return this._pbVal;
    },
    set pbVal( value ){
      return ( this._pbVal = value );
    },
    ready: function () {
      if( parseInt(this.attributes["value"].value) < 100) {
        this.progressValue = parseInt(this.attributes["value"].value);
      } else {
        alert("IT'S OVER NINE THOUSAND!!!");
      }

      if ( this.attributes["max"] ) {
        this.progressMax = parseInt(this.attributes["max"].value) && typeof parseInt(this.attributes["max"].value) == "number" ? parseInt(this.attributes["max"].value) : 100;
      } else {
        this.progressMax = 100;
      }

      if( this.progressValue < this.progressMax) {
        this.pbVal = Math.round((this.progressValue * 100) / (this.progressMax));
      } else {
        alert("Value is larger than Max");
      }

      this.shadowRoot.getElementById("bar").style.width = this._pbVal+"%";

    }
  });
})( window.Polymer );
