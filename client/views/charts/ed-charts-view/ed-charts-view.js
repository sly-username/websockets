( function( polymer ) {
  "use strict";
  var triggerMenuHandler = function() {
    if ( this.edMenu.getAttribute( "class" ) === "show-menu" ) {
      this.edMenu.setAttribute( "class", "hide-menu" );
      this.appRouter.setAttribute( "class", "show-router" );
    } else {
      this.edMenu.setAttribute( "class", "show-menu" );
      this.appRouter.setAttribute( "class", "hide-router" );
    }
  };

  polymer( "ed-charts-view", {
    /* LIFECYCLE */
    // placeholder data, replace with data object
    _options: [
      {
        rank: 1,
        image: "http://www.placecage.com/200/300",
        name: "Place Cage",
        points: 212732
      },
      {
        rank: 2,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 112732
      },
      {
        rank: 3,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 10732
      },
      {
        rank: 4,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 9732
      },
      {
        rank: 5,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 4732
      },
      {
        rank: 6,
        image: "http://www.placecage.com/200/300",
        name: "Place Cage",
        points: 732
      },
      {
        rank: 7,
        image: "http://www.placecage.com/200/300",
        name: "Place Cage",
        points: 10
      },
      {
        rank: 8,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 9
      },
      {
        rank: 9,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 8
      },
      {
        rank: 10,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 7
      },
      {
        rank: 11,
        image: "http://www.fillmurray.com/200/300",
        name: "Fill Murray",
        points: 6
      },
      {
        rank: 12,
        image: "http://www.placecage.com/200/300",
        name: "Place Cage",
        points: 5
      }
    ],
    ready: function() {
      this.edMenu = document.getElementById( "side-menu" );
      this.appRouter = document.getElementById( "animation-wrapper" );
      this.triggerBtn = this.shadowRoot.getElementById( "menu-trigger" );
      this.handlers = {
        triggerMenu: triggerMenuHandler.bind( this )
      };
    },
    attached: function() {
      this.triggerBtn.addEventListener( "click", this.handlers.triggerMenu );
      this.triggerBtn.addEventListener( "tap", this.handlers.triggerMenu );
    },
    detached: function() {
      this.triggerBtn.removeEventListener( "click", this.handlers.triggerMenu );
      this.triggerBtn.removeEventListener( "tap", this.handlers.triggerMenu );
    },
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer );
