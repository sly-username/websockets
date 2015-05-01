( function( polymer ) {
  "use strict";
  var triggerSubmitHandler = function() {

  };

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" )
  ]).then(function( imported ) {
    polymer( "ed-forgot-pass-request-view", {
      /* LIFECYCLE */
      ready: function() {
        this.submitBtn = this.shadowRoot.getElementById( "forgot-submit" );
        this.handlers = {
          triggerSubmit: triggerSubmitHandler.bind( this )
        };
      },
      attached: function() {
        this.submitBtn.addEventListener( "click", this.handlers.triggerSubmit );
      },
      detached: function() {
        this.submitBtn.removeEventListener( "click", this.handlers.triggerSubmit );
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer );
