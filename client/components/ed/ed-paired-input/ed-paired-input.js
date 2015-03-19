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
      this._errorDiv = this.shadowRoot.getElementById( "error" );
      this._boxes = [ this.primaryBox, this.confirmBox ];
    },
    attached: function() {
      this._primaryBox.addEventListener( "blur", this.regexCheck.bind( this ) );
      this._confirmBox.addEventListener( "blur", this.keyConfirm.bind( this ) );
    },
    detached: function() {
      this._primaryBox.removeEventListener( "blur", this.regexCheck.bind( this ) );
      this._confirmBox.removeEventListener( "blur", this.keyConfirm.bind( this ) );
    },
    regexCheck: function() {
      if ( this.primaryBox.validity.valid ) {
        this.errorDiv.innerHTML = "";
        this.removeAttribute( "invalid-primary" );
      } else {
        this.errorDiv.innerHTML = "Password is not 8 characters long";
        this.setAttribute( "invalid-primary", "" );
      }
    },
    keyConfirm: function() {
      if ( this.isValid && this.primaryBox !== "" && this.confirmBox !== "" ) {
        this.errorDiv.innerHTML = "";
        this.removeAttribute( "invalid-confirm" );
      } else {
        this.errorDiv.innerHTML = "Passwords must match";
        this.setAttribute( "invalid-confirm", "" );
      }
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
