( function( polymer, System ) {
  "use strict";

  Promise.all([
    System.import( "domain/ed/services/ed-data-service" ),
    System.import( "domain/ed/services/ed-user-service" )
  ]).then(function( imported ) {
      var
        dataService = imported[ 0 ].default,
        userService = imported[ 1 ].default;

      polymer( "ed-profile-fan", {
        // roll your own reflection...
        get edId() {
          return this.getAttribute( "ed-id" );
        },
        set edId( value ) {
          this.setAttribute( "ed-id", value );
          return value;
        },
        /* LIFECYCLE */
        ready: function() {
          this.iconContainer = this.shadowRoot.querySelector( ".icon-section" );
          this.editBtn = this.shadowRoot.querySelector( "#edit-btn" );
        },
        attached: function() {
          this.badgeEdIcons = Array.prototype.slice.call( this.shadowRoot.querySelectorAll( ".badge-section > ed-icon" ), 0);

          // force model update, may cause extra profile "get" but data service handles that case with the LRU so no extra server call is made
          this.updateProfileModel();

          // update stats
          userService.getStats()
            .then(function( response ) {
              this.songsRated = response.ratedTracks;
              this.yourRank = response.completedListens;
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
            dataService.getFanById( this.edId )
              .then(function( edFan ) {
                this.edFan = edFan;
                this.updateBadges();
                console.log( "Fan got: %o", edFan );
              }.bind( this ));

            // id could be string or number, use lazy compare
            if ( userService.isOpenSession && userService.currentProfile.id == this.edId && this.iconContainer.children.length === 0 ) {
              this.iconContainer.appendChild( this.editBtn );
            } else if ( this.iconContainer.children.length !== 0 ) {
              this.iconContainer.removeChild( this.editBtn );
            }
          }
        },
        updateBadges: function() {
          // todo counts
          this.badgeEdIcons.forEach(function( edIcon, index ) {
            var edBadge;

            if ( edBadge = this.edFan.badges[ index ]) {
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
