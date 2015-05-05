( function( polymer ) {
  "use strict";

  var currentView = 1,
    updateChartsViewHandler = function( event ) {
      var eventType = event.detail.name,
        updateChartClass = function( classesRemoveArray, classAdd, self ) {
          classesRemoveArray.forEach( function( classNumber ) {
            self.singleChartWrapper.classList.remove( classNumber );
            self.singleChartWrapper.classList.add( classAdd );
          });
        };

      if ( eventType === "moveLeft" ) {
        switch ( currentView ) {
          case 1:
            updateChartClass( [ "one", "three", "four" ], "two", this );
            currentView = 2;
            break;
          case 2:
            updateChartClass( [ "one", "two", "four" ], "three", this );
            currentView = 3;
            break;
          case 3:
            updateChartClass( [ "one", "two", "four" ], "four", this );
            currentView = 4;
            break;
          case 4:
            updateChartClass( [ "two", "three", "four" ], "one", this );
            // todo disable final view from going left
            currentView = 1;
            break;
          default:
            // fall through
            break;
        }
      }

      if ( eventType === "moveRight" ) {
        switch ( currentView ) {
          case 1:
            // todo disable first view from going right
            updateChartClass( [ "one", "three", "four" ], "two", this );
            currentView = 2;
            break;
          case 2:
            updateChartClass( [ "one", "two", "four" ], "three", this );
            currentView = 3;
            break;
          case 3:
            updateChartClass( [ "one", "two", "four" ], "four", this );
            currentView = 4;
            break;
          case 4:
            updateChartClass( [ "two", "three", "four" ], "one", this );
            currentView = 1;
            break;
          default:
            // fall through
            break;
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
