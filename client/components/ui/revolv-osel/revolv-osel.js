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
      return ( 650 * ( -1 * this.marker ) ) + "px";
    },
    ready: function() {
      this.container = this.shadowRoot.querySelector( ".carousel" );
      this.triggerNext = this.shadowRoot.querySelector( ".carousel-nav-next" );
      this.triggerPrev = this.shadowRoot.querySelector( ".carousel-nav-prev" );
      this.carouselList = this.querySelector( "ul" );
      this.carouselListItems = this.querySelectorAll( "li" );
      this.paginationNav = this.shadowRoot.querySelector( ".pagination" );
      this.marker = 0;
      // builds the pagination
      if ( this.pagination === true ) {
        buildBulletNav(
          this.paginationNav,
          this.carouselListItems.length
        );
      }
      // checks show-buttons
      this.showButtons = this.hasAttribute( "show-buttons" );
    },
    attached: function() {
      this.carouselListItems[0].setAttribute( "class", "selected-item" );
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
    updateMarkerBullet: function( index ) {
      this.carouselListItems[this.marker].removeAttribute( "class" );
      this.carouselListItems[index].setAttribute( "class", "selected-item" );
    },
    // go to the next slide
    nextSlide: function() {
      this.carouselListItems[this.marker].removeAttribute( "class" );

      if ( this.marker < ( this.carouselListItems.length - 1 ) ) {
        this.marker++;
      } else {
        this.marker = 0;
      }
      this.carouselListItems[this.marker].setAttribute( "class", "selected-item" );
      this.carouselList.style.marginLeft = this.slideBy;
    },
    // go to previous slide
    prevSlide: function() {
      this.carouselListItems[this.marker].removeAttribute( "class" );

      if ( this.marker === 0 ) {
        this.marker = this.carouselListItems.length - 1;
      } else {
        this.marker--;
      }

      this.carouselListItems[this.marker].setAttribute( "class", "selected-item" );
      this.carouselList.style.marginLeft = this.slideBy;
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
