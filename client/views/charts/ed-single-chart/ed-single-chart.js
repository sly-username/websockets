( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/lib/event/create-event" )
  ]).then( function( imported ) {
    var discoverService = imported[0].default,
      createEvent = imported[1].default,
      createUpdateEvent = function( name, detail ) {
        detail = detail || {};
        detail.name = name;

        return createEvent( "chartsUpdate", {
          detail: detail
        });
      },
      leftMoveHandler = function() {
        this.dispatchEvent( createUpdateEvent( "moveLeft" ));
      },
      rightMoveHandler = function() {
        this.dispatchEvent( createUpdateEvent( "moveRight" ));
      };

    polymer( "ed-single-chart", {
      discoverService: discoverService,
      publish: {
        "chart-title": {
          reflect: true
        },
        "chart-subtitle": {
          reflect: true
        },
        "chart-badge": {
          reflect: true
        },
        "chart-name": {
          reflect: true
        }
      },
      get chartTitle() {
        return this[ "chart-title" ];
      },
      get chartSubtitle() {
        return this[ "chart-subtitle" ];
      },
      get chartBadge() {
        return this[ "chart-badge" ];
      },
      get chartIdentifier() {
        return this[ "chart-name" ];
      },
      ready: function() {
        this.arrowLeft = this.$[ "arrow-left" ];
        this.arrowRight = this.$[ "arrow-right" ];
      },
      attached: function() {
        this.getLeaderBoard();

        this.handler = {
          leftMove: leftMoveHandler.bind( this ),
          rightMove: rightMoveHandler.bind( this )
        };
        this.arrowLeft.addEventListener( "click", this.handler.leftMove );
        this.arrowRight.addEventListener( "click", this.handler.rightMove );
      },
      detached: function() {
        this.arrowLeft.removeEventListener( "click", this.handler.leftMove );
        this.arrowRight.removeEventListener( "click", this.handler.rightMove );
      },
      getLeaderBoard: function() {
        var chartIdentifier = this.chartIdentifier;
        return discoverService.getLeaderboardCharts( chartIdentifier )
          .then( function( edChart ) {
            console.log( edChart );
            this.edChart = edChart;
            this.dateEnds = edChart.raw.data.dateEnds;
            edChart.leaderboardCollection.getInSequence( 0, 10, true )
              .then( function( chartList ) {
                this.rankingsList = chartList;
                // todo change to id when updated
                this.countdown = edChart.timeRemaining;
                //this.score = edChart.getRankForId( chartList.data.leaderboard.profileId );
                console.log( chartList );
              }.bind( this ));
            return edChart;
          }.bind( this ));
      },
      attributeChanged: function( attrName, oldVal, newVal ) {
      }
    });
  });
})( window.Polymer, window.System );

// [ "completed-listens-fan", "most-tracks-rated-fan", "completed-listens-artist", "highest-rated-artist" ],
