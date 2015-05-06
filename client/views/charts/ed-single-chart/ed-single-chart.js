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
        this.getLeaderBoard( "highest-rated-artist" );
      },
      rightMoveHandler = function() {
        this.dispatchEvent( createUpdateEvent( "moveRight" ));
        this.getLeaderBoard( "highest-rated-artist" );
      };

    polymer( "ed-single-chart", {
      // todo placeholder data, replace with data object
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
      ready: function() {
        this.arrowLeft = this.$[ "arrow-left" ];
        this.arrowRight = this.$[ "arrow-right" ];
      },
      attached: function() {
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
      getLeaderBoard: function( chartName ) {
        return discoverService.getLeaderboardCharts( chartName )
          .then( function( edChart ) {
            console.log( edChart );
            this.edChart = edChart;
            this.rankingsList = edChart.leaderboardCollection.getInSequence();
            return edChart;
          }.bind( this ));

        // todo how to tell difference between artist and fan?
        //return this.leaders.forEach( function( leader, index ) {
        //  dataService.getByTypeAndId( "artist", leader.profileId )
        //    .then( function( rankedUser ) {
        //      this.leaders[ index ] = rankedUser;
        //      return this.rankedUsers.push( rankedUser );
        //    }.bind( this ));
        //}.bind( this ));
      },
      getDateEnds: function() {

      },
      attributeChanged: function( attrName, oldVal, newVal ) {
      }
    });
  });
})( window.Polymer, window.System );
