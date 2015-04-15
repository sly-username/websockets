( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-data-service" )
    .then(function( imported ) {
      var dataService = imported.default;

      polymer( "ed-profile-fan", {
        /* LIFECYCLE */
        ready: function() {
          dataService.getFanById( this.attributes[ "ed-id" ].value )
            .then(function( edFan ) {
              this.edFan = edFan;
            }.bind( this ));
        },
        attached: function() {},
        detached: function() {},
        attributeChanged: function( attrName, oldValue, newValue ) {
          if ( attrName === "ed-id" ) {
            dataService.getFanById( this.attributes[ "ed-id" ].value )
              .then(function( edFan ) {
                this.edFan = edFan;
              }.bind( this ));
          }
        }
      });
    });
})( window.Polymer, window.System );
