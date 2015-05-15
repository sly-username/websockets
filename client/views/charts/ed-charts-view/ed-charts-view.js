( function( polymer ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" )
  ]).then( function( imported ) {
    var discoverService = imported[ 0 ].default,
      currentView = 1,
      chartNames = [ "most-tracks-rated-fan", "completed-listens-fan", "completed-listens-track", "highest-rated-track" ],
      updateChartPosition = function( classesRemoveArray, classAdd, self ) {
        classesRemoveArray.forEach( function( classNumber ) {
          self.singleChartWrapper.classList.remove( classNumber );
          self.singleChartWrapper.classList.add( classAdd );
        });
      },
      updateChartsViewHandler = function( event ) {




        //var eventType = event.detail.name;
        //
        //if ( eventType === "moveLeft" ) {
        //  switch ( currentView ) {
        //    case 1:
        //      updateChartClass( [ "one", "three", "four" ], "two", this );
        //      currentView = 2;
        //      break;
        //    case 2:
        //      updateChartClass( [ "one", "two", "four" ], "three", this );
        //      currentView = 3;
        //      break;
        //    case 3:
        //      updateChartClass( [ "one", "two", "four" ], "four", this );
        //      currentView = 4;
        //      break;
        //    case 4:
        //      updateChartClass( [ "two", "three", "four" ], "one", this );
        //      // todo disable final view from going left
        //      currentView = 1;
        //      break;
        //    default:
        //      // fall through
        //      break;
        //  }
        //}
        //
        //if ( eventType === "moveRight" ) {
        //  switch ( currentView ) {
        //    case 1:
        //      // todo disable first view from going right
        //      updateChartClass( [ "one", "three", "four" ], "two", this );
        //      currentView = 2;
        //      break;
        //    case 2:
        //      updateChartClass( [ "one", "two", "four" ], "three", this );
        //      currentView = 3;
        //      break;
        //    case 3:
        //      updateChartClass( [ "one", "two", "four" ], "four", this );
        //      currentView = 4;
        //      break;
        //    case 4:
        //      updateChartClass( [ "two", "three", "four" ], "one", this );
        //      currentView = 1;
        //      break;
        //    default:
        //      // fall through
        //      break;
        //  }
        //}
      };

    polymer( "ed-charts-view", {
      /* LIFECYCLE */
      ready: function() {
        this.singleChartWrapper = this.$[ "single-chart-wrapper" ];

        this.chartElementsByName = {};

        Array.prototype.forEach.call( this.shadowRoot.querySelectorAll( "ed-single-chart" ), function( chartElement ) {
          this.chartElementsByName[ chartElement.chartIdentifier ] = chartElement;
        }, this );
      },
      attached: function() {
        this.handler = {
          updateChartView: updateChartsViewHandler.bind( this )
        };

        this.addEventListener( "chartsUpdate", this.handler.updateChartView );

        this.getEdChartObject();
      },
      detached: function() {
        this.removeEventListener( "chartsUpdate", this.handler.updateChartView );
      },
      getEdChartObject: function() {
        var
          chartIndex = 0,
          maxIndex = chartNames.length,
          componentAssignment = function( edChart ) {
            if ( edChart.chartName in this.chartElementsByName ) {
              this.chartElementsByName[ edChart.chartName ].chartObject = edChart;

              console.dir( this.chartElementsByName[ edChart.chartName ] );
              console.dir( edChart );
            }

            return edChart;
          }.bind( this ),
          nextGet = function( nextIndex ) {
            return function( edChart ) {
              if ( nextIndex >= maxIndex ) {
                return componentAssignment( edChart );
              }

              return discoverService.getLeaderboardCharts( chartNames[ nextIndex ] )
                .then( componentAssignment )
                .then( nextGet( nextIndex + 1 ));
            };
          };

        return discoverService.getLeaderboardCharts( chartNames[ chartIndex ] )
          .then( componentAssignment )
          .then( nextGet( chartIndex + 1 ));
      },
      attributeChanged: function( attrName, oldValue, newValue ) {}
      /* PROPERTIES */
      /* METHODS */
    });
  });
})( window.Polymer )
