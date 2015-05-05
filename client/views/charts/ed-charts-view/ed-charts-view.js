( function( polymer ) {
  "use strict";

  var updateChartsViewHandler = function( event ) {
    var eventType = event.detail.name,
      updateChartClass = function( classesRemoveArray, classAdd, self ) {
        classesRemoveArray.forEach( function( classNumber ) {
          self.singleChartWrapper.classList.remove( classNumber );
          self.singleChartWrapper.classList.add( classAdd );
        });
    };

    if ( eventType === "moveLeft" ) {
      if ( "view one" ) {
        updateChartClass( [ "one", "three", "four" ], "two", this );
      } else if ( "view two" ) {
        updateChartClass( [ "one", "two", "four" ], "three", this );
      } else if ( "view three" ) {
        updateChartClass( [ "one", "two", "four" ], "four", this );
      } else if ( "view four" ) {
        updateChartClass( [ "two", "three", "four" ], "one", this );
      }
    }

    if ( eventType === "moveRight" ) {
      if ( "view one" ) {
        updateChartClass( [ "one", "three", "four" ], "two", this );
      } else if ( "view two" ) {
        updateChartClass( [ "one", "two", "four" ], "three", this );
      } else if ( "view three" ) {
        updateChartClass( [ "one", "two", "four" ], "four", this );
      } else if ( "view four" ) {
        updateChartClass( [ "two", "three", "four" ], "one", this );
      }
    }
  };

  polymer( "ed-charts-view", {
    /* LIFECYCLE */
    ready: function() {
      this.singleChartWrapper = this.$[ "single-chart-wrapper" ];
    },
    attached: function() {
      this.handler = {
        updateChartView: updateChartsViewHandler.bind( this )
      };
      this.addEventListener( "chartsUpdate", this.handler.updateChartView );
    },
    detached: function() {},
    attributeChanged: function( attrName, oldValue, newValue ) {}
    /* PROPERTIES */
    /* METHODS */
  });
})( window.Polymer )
