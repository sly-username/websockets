( function( polymer ) {
  "use strict";

  polymer( "revolv-osel", {
    _options: [],
    showButtons: false,
    publish: {
      loop: {
        value: true,
        reflect: true
      },
      pagination: {
        value: true,
        reflect: true
      },
      visible: {
        reflect: true
      }
    },
    ready: function() {
    },

    created: function() {
      Array.prototype.forEach.call( this.children, function( elem ) {
        this._options.push({
          src: elem.src,
          href: elem.href
        });
      }.bind( this ) );
    }
  });
})( window.Polymer );
