( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        userService = imported[ 1 ].default;

      polymer( "ed-profile-artist", {
        // roll your own reflection...
        get edId() {
          return this.getAttribute( "ed-id" );
        },
        set edId( value ) {
          this.setAttribute( "ed-id", value );
          return value;
        },
        /* LIFECYCLE */
//        ready: function() {},
        attached: function() {
          this.badgeEdIcons = Array.prototype.slice.call( this.shadowRoot.querySelectorAll( ".badge-section > ed-icon" ));

          if ( this.edId ) {
            this.updateProfileModel();
          }

          // update stats
          userService.getStats()
            .then(function( response ) {
              this.$[ "songs-rated" ].setAttribute( "rank", response.ratedTracks );
              this.$[ "complete-listens" ].setAttribute( "rank", response.completedListens );
            }.bind( this ));
        },
//        detached: function() {},
        attributeChanged: function( attrName ) {
          if ( attrName === "ed-id" ) {
            this.updateProfileModel();
          }
        },
        updateProfileModel: function() {
          if ( this.edId != null ) {
            // get profile
            dataService.getArtistById( this.edId )
              .then(function( edArtist ) {
                this.edArtist = edArtist;
                this.injectBoundHTML(  edArtist.bio || "No biography", this.$[ "bio-content" ]);
                this.updateBadges();
                console.log( "profile artist got: %o", edArtist );
              }.bind( this ));
          }
        },
        updateBadges: function() {
          // todo counts
          this.badgeEdIcons.forEach(function( edIcon, index ) {
            var edBadge;

            if ( edBadge = this.edArtist.badges[ index ]) {
              edIcon.setAttribute( "name", edBadge.iconName );

              if ( edBadge.count ) {
                edIcon.setAttribute( "count", edBadge.count );
              } else {
                edIcon.removeAttribute( "count" );
              }
            } else {
              edIcon.setAttribute( "name", "badge-empty" );
              edIcon.removeAttribute( "count" );
            }
          }, this );
        }
      });
    });
})( window.Polymer, window.System );
