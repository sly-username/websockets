( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" )
  ])
    .then(function( imported ) {
      var dataService = imported.default;

      polymer( "ed-profile-fan", {
        /* LIFECYCLE */
        ready: function() {
          dataService.getFanById( this.attributes[ "ed-id" ].value ).then(function( edFan ){
            this.edFan = edFan;
          }.bind( this ));
        },
        attached: function() {},
        detached: function() {},
        attributeChanged: function( attrName, oldValue, newValue ) {
          dataService.getFanById( this.attributes[ "ed-id" ].value ).then(function( edFan ){
            this.edFan = edFan;
          }.bind( this ));
        }
        // todo changes on ed-id attr
        /* PROPERTIES */
        /* METHODS */
      });
    });
})( window.Polymer, window.System );
