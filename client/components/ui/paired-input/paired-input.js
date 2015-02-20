( function( Polymer ) {
  "use strict";
  var copyableAttributes = [ "type", "disabled", "required", "pattern", "placeholder" ],
    copyAttributes = function( elemFrom, elemsTo, attrs ) {
      attrs.forEach( function( attr ) {
        var value;

        if ( elemFrom.hasAttribute( attr ) ) {
          value = elemFrom.getAttribute( attr );
          elemsTo.forEach( function( elem ) { elem.setAttribute( attr, value ); });
        } else {
          elemsTo.forEach( function( elem ) { elem.removeAttribute( attr ); });
        }
      });
    };

  Polymer( "paired-input", {
    publish: {
      type: {
        value: false,
        reflect: true
      },
      placeholder: {
        value: false,
        reflect: true
      },
      pattern: {
        reflect: true
      },
      required: {
        value: false,
        reflect: true
      },
      disabled: {
        value: false,
        reflect: true
      },
      singleline: {
        reflect: true
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
    ready: function() {
      this._primaryBox = this.shadowRoot.getElementById( "primaryBox" );
      this._confirmBox = this.shadowRoot.getElementById( "confirmBox" );
      this._errorDiv = this.shadowRoot.getElementById( "error" );
      this._boxes = [ this.primaryBox, this.confirmBox ];

      copyAttributes( this, this.boxes, copyableAttributes );

      if ( this.hasAttribute( "placeholder" ) ) {
        this.confirmBox.setAttribute(
          "placeholder",
          "Confirm " + this.getAttribute( "placeholder" )
        );
      }

      // TODO fix maybe?
      if ( this.primaryBox.hasAttribute( "single-line" ) ) {
        this.primaryBox.style.display = this.confirmBox.style.display = "inline";
      }

      if ( this.attributes.type && !( /text|password|email|tel|number|url|search/ ).test( this.attributes.type.value ) ) {
        this.setAttribute( "type", "text" );
      }
    },
    attached: function() {
      this.addEventListener( "keyup", this.keyConfirm );
    },
    keyConfirm: function() {
      this.errorDiv.innerHTML =
        this.isValid &&
        this.primaryBox !== "" &&
        this.confirmBox !== "" ? "fields are valid" : "fields are not valid";
    },
    get isValid() {
      return this.primaryBox.validity.valid && this.primaryBox.value === this.confirmBox.value;
    },
    get val() {
      return [ this.primaryBox.value, this.confirmBox.value ];
    },
    set val( val ) {
      this.primaryBox.value = this.confirmBox.value = val;
      return true;
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      if ( copyableAttributes.some( function( value ) { return attrName === value; }) ) {
        copyAttributes( this, this.boxes, [ attrName ]);
      } else if ( attrName === "single-line" ) {
        if ( newVal == null ) {
          this.primaryBox.style.display = this.confirmBox.style.display = "block";
        } else {
          this.primaryBox.style.display = this.confirmBox.style.display = "inline";
        }
      }
    }
  });
})( Polymer );
