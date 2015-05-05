( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-discover-service" ),
    System.import( "domain/ed/services/ed-data-service" )
  ]).then( function( imported ) {
    var discoverService = imported[0].default,
      dataService = imported[1].default;

    polymer( "ed-single-chart", {
      // todo placeholder data, replace with data object
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
        "chart-position": {
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
      get chartPosition() {
        return this[ "chart-position" ];
      },
      leaders: [],
      rankedUsers: [],
      ready: function() {
        this.arrowLeft = this.shadowRoot.querySelector( "#left-arrow" );
        this.arrowRight = this.shadowRoot.querySelector( "right-arrow" );
      },
      attached: function() {
        this.arrowLeft.addEventListener( "click", function() {
          if ( this.chartPosition === "first" ) {
            this.chartPosition.setAttribute( "chart-position", "second" );
            this.classList.remove( "first" );
            this.classList.add( "second" );
          } else if ( this.chartPosition === "second" ) {
            this.chartPosition.setAttribute( "chart-position", "third" );
            this.classList.remove( "second" );
            this.classList.add( "third" );
          } else if ( this.chartPosition === "third" ) {
            this.chartPosition.setAttribute( "chart-position", "fourth" );
            this.classList.remove( "third" );
            this.classList.add( "fourth" );
          } else if ( this.chartPosition === "fourth" ) {
            this.chartPosition.setAttribute( "chart-position", "first" );
            this.classList.remove( "fourth" );
            this.classList.add( "first" );
          }
        });
      },
      detached: function() {
      },
      getLeaderBoard: function( chartName ) {
        return discoverService.getLeaderboardCharts( chartName )
          .then( function( response ) {
            this.dateEnds = response.dateEnds;
            this.leaders = response.leaderboard;
            return this.leaders;
          }.bind( this ));
      },
      getLeaderProfiles: function( chartName ) {
        this.getLeaderBoard( chartName );

        // todo how to tell difference between artist and fan?
        return this.leaders.forEach( function( leader, index ) {
          dataService.getByTypeAndId( "artist", leader.profileId )
            .then( function( rankedUser ) {
              this.leaders[ index ] = rankedUser;
              return this.rankedUsers.push( rankedUser );
            }.bind( this ));
        }.bind( this ));
      },
      getDateEnds: function() {

      },
      attributeChanged: function( attrName, oldValue, newValue ) {

      }
    });
  });
})( window.Polymer, window.System );
