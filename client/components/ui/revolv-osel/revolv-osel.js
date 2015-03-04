( function( polymer ) {
  "use strict";
  var createPaginationBullet = function( index ) {
      var anchor = document.createElement( "a" );
      anchor.className = "pagination-nav";
      anchor.setAttribute( "data-index", index );
      return anchor;
    },
    buildBulletNav = function( parent, numberOfItems ) {
      var i = 0;

      for ( ; i < numberOfItems; i++ ) {
        parent.appendChild( createPaginationBullet( i ) );
      }
    };

  polymer( "revolv-osel", {
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
        value: 1,
        reflect: true
      }
    },
    // retuns the value to slide the container
    get slideBy() {
      return ( ( 650 / this.visible ) * ( -1 * this.marker ) ) + "px";
    },
    ready: function() {
      this.container = this.shadowRoot.querySelector( ".carousel" );
      this.triggerNext = this.shadowRoot.querySelector( ".carousel-nav-next" );
      this.triggerPrev = this.shadowRoot.querySelector( ".carousel-nav-prev" );
      this.carouselList = this.querySelector( "ul" );
      this.carouselListItems = this.querySelectorAll( "li" );
      this.paginationNav = this.shadowRoot.querySelector( ".pagination" );
      // builds the pagination
      if ( this.pagination === true ) {
        buildBulletNav(
          this.paginationNav,
          this.carouselListItems.length
        );
      }
      // checks show-buttons
      this.showButtons = this.hasAttribute( "show-buttons" );
      // sets the first item as the selected Item
      this.carouselListItems[0].setAttribute( "class", "selected-item" );
      this.getIndex();
    },
    attached: function() {
      // Event listener when clicking the next button to switch slides
      this.triggerNext.addEventListener( "click", function( e ) {
        e.preventDefault();
        this.nextSlide();
      }.bind( this ) );
      this.triggerPrev.addEventListener( "click", function( e ) {
        e.preventDefault();
        this.prevSlide();
      }.bind( this ) );
      this.paginationNav.addEventListener( "click", function( e ) {
        e.preventDefault();
        this.bulletSlide( e.toElement.attributes[ "data-index" ].value );
      }.bind( this ) );
    },
    // gets the index of the selected item
    getIndex: function() {
      var i;

      for ( i = 0; i < this.carouselListItems.length; i++ ) {
        if ( this.carouselListItems[i].className === "selected-item" ) {
          this.marker = i;
          return i;
        }
      }
    },
    updateMarkerNext: function() {
      this.carouselListItems[this.marker - 1].removeAttribute( "class" );
      this.carouselListItems[this.marker].setAttribute( "class", "selected-item" );
    },
    updateMarkerPrev: function() {
      this.carouselListItems[this.marker + 1].removeAttribute( "class" );
      this.carouselListItems[this.marker].setAttribute( "class", "selected-item" );
    },
    updateMarkerToFirst: function() {
      this.carouselListItems[this.carouselListItems.length - 1].removeAttribute( "class" );
      this.carouselListItems[0].setAttribute( "class", "selected-item" );
    },
    updateMarkerToLast: function() {
      this.carouselListItems[0].removeAttribute( "class" );
      this.carouselListItems[this.carouselListItems.length - 1].setAttribute( "class", "selected-item" );
    },
    updateMarkerBullet: function( index ) {
      this.carouselListItems[this.marker].removeAttribute( "class" );
      this.carouselListItems[index].setAttribute( "class", "selected-item" );
    },
    // tracks the position fo the carousel
    // goes the the first slide once at the end
    increaseSlide: function() {
      if ( this.marker < this.carouselListItems.length ) {
        this.marker++;
      } else {
        this.marker = 1;
      }
    },
    // goes to the last slide if going backwayrds
    decreaseSlide: function() {
      if ( this.marker === 0 ) {
        this.marker = this.carouselListItems.length - 1;
      } else {
        this.marker--;
      }
    },
    // go to the next slide
    nextSlide: function() {
      this.increaseSlide();

      if ( this.marker < this.carouselListItems.length ) {
        this.updateMarkerNext();
        this.carouselList.style.marginLeft = this.slideBy;
      } else {
        this.updateMarkerToFirst();
        this.carouselList.style.marginLeft = 0;
      }
    },
    // go to previous slide
    prevSlide: function() {
      this.decreaseSlide();

      if ( this.marker === ( this.carouselListItems.length - 1 ) ) {
        this.updateMarkerToLast();
        this.carouselList.style.marginLeft = this.slideBy;
      } else {
        this.updateMarkerPrev();
        this.carouselList.style.marginLeft = this.slideBy;
      }
    },
    bulletSlide: function( index ) {
      this.updateMarkerBullet( index );
      this.marker = index;
      this.carouselList.style.marginLeft = this.slideBy;
    },
    paginationChanged: function( oldValue, newValue ) {
      if ( newValue ) {
        buildBulletNav(
          this.paginationNav,
          this.carouselListItems.length
        );
      } else {
        while ( this.paginationNav.firstChild ) {
          this.paginationNav.removeChild( this.paginationNav.firstChild );
        }
      }
    },
    showButtonsChanged: function( oldValue, newValue ) {
      if ( newValue ) {
        this.setAttribute( "show-buttons", "" );
      } else {
        this.removeAttribute( "show-buttons" );
      }
    },
    attributeChanged: function( attrName, oldVal, newVal ) {
      this.showButtons = this.hasAttribute( "show-buttons" );
    }
  });
})( window.Polymer );
