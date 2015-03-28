( function( polymer ) {
  "use strict";

  polymer( "ed-profile-edit", {
    /* LIFECYCLE */
    ready: function() {
      this.editForm = this.shadowRoot.getElementById( "edit-form" );
      this.firstName = this.shadowRoot.getElementById( "first-name" );
      this.lastName = this.shadowRoot.getElementById( "last-name" );
      this.choosePhoto = this.shadowRoot.getElementById( "choose-photo" );
      this.takePhoto = this.shadowRoot.getElementById( "take-photo" );
    },
    attached: function() {
      this.firstName.addEventListener( "blur", this.autoSubmit.bind( this ) );
      this.lastName.addEventListener( "blur", this.autoSubmit.bind( this ) );
      this.choosePhoto.addEventListener( "change", this.autoSubmit.bind( this ) );
      this.takePhoto.addEventListener( "change", this.autoSubmit.bind( this ) );
    },
    detached: function() {
      this.firstName.removeEventListener( "blur", this.autoSubmit.bind( this ) );
      this.lastName.removeEventListener( "blur", this.autoSubmit.bind( this ) );
      this.choosePhoto.removeEventListener( "change", this.autoSubmit.bind( this ) );
      this.takePhoto.removeEventListener( "change", this.autoSubmit.bind( this ) );
    },
    autoSubmit: function() {
      this.editForm.submit();
    },
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
