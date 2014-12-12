(function( Polymer ) {
  "use strict";

  Polymer("progress-bar", {
    get progressValue(){
      return this._progressValue;
    },
    set progressValue(value){
      this.attributes["progress-value"].value = value;
      return (this._progressValue = value);
    },
    ready: function () {
      this.progressValue  = this.attributes["progress-value"].value;
      console.log(this._progressValue);
      this.shadowRoot.getElementById("bar").style.width = this._progressValue+"%";
    }
  });
})( window.Polymer );
