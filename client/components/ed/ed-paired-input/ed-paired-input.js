( function( polymer ) {
  "use strict";

  polymer( "ed-paired-input", {
    publish: {
      type: {
        reflect: true
      },
      placeholder: {
        reflect: true
      },
      pattern: {
        reflect: true
      },
      required: {
        reflect: true,
        value: false
      },
      disabled: {
        reflect: true,
        value: false
      }
    },
    get primaryBox() {
      return this._primaryBox;
    },
    get confirmBox() {
      return this._confirmBox;
    },
    get errorDiv() {
      return this._errorDiv;
    },
    get boxes() {
      return this._boxes;
    },
    get isValid() {
      return this.primaryBox.validity.valid && this.primaryBox.value !== "" &&
        this.primaryBox.value === this.confirmBox.value;
    },
    get val() {
      if ( this.primaryBox.value !== this.confirmBox.value ) {
        return;
      }

      return this.primaryBox.value;
    },
    set val( val ) {
      this.primaryBox.value = this.confirmBox.value = val;
      return true;
    },
    ready: function() {
      this._primaryBox = this.shadowRoot.getElementById( "primary-box" );
      this._confirmBox = this.shadowRoot.getElementById( "confirm-box" );
      this._boxes = [ this.primaryBox, this.confirmBox ];
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( attrName === "type" ) {
        if ( ( /text|password|email|tel|number|url|search/ ).test( newVal ) ) {
          this.type = newVal;
        } else {
          this.type = "text";
        }
      }
    }
  });
})( window.Polymer );
