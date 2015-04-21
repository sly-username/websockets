( function( polymer, System ) {
  "use strict";

  System.import( "domain/ed/services/ed-discover-service" )
    .then(function( imported ) {
      var discoverService = imported.default;

      polymer( "ed-discover-view", {
        ready: function() {
        },
        attached: function() {
        },
        detached: function() {},
        attributeChanged: function( attrName, oldValue, newValue ) {}
      });
    });
})( window.Polymer, window.System );
