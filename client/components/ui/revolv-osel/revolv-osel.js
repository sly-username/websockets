( function( polymer ) {
  "use strict";
  var createPaginationBullet = function() {
      var anchor = document.createElement( "a" );
      anchor.className = "pagination-nav";
      return anchor;
    },
    buildBulletNav = function( parent, numberOfItems ) {
      var i = 0;

      for ( ; i < numberOfItems; i++ ) {
        parent.appendChild( createPaginationBullet() );
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
      this.marker = this.getIndex();
      // builds the pagination
      buildBulletNav(
        this.shadowRoot.querySelector( ".pagination" ),
        this.carouselListItems.length
      );
      // sets the first item as the selected Item
      this.carouselListItems[0].setAttribute( "class", "selected-item" );
    },
    attached: function() {
      this.triggerPagination = this.shadowRoot.querySelectorAll( ".pagination-nav" );
      // Event listener when clicking the next button to switch slides
      this.triggerNext.addEventListener( "click", function( e ) {
        e.preventDefault();
        this.nextSlide();
      });
      this.triggerPrev.addEventListener( "click", function( e ) {
        e.preventDefault();
        this.prevSlide();
      });
      this.bindPagination( this.triggerPagination, "click", function( e ) {
        e.preventDefault();
        console.log( e );
      });
    },
    bindPagination: function( list, event, fn ) {
      var i;

      for ( i = 0; i < list.length; i++ ) {
        list[i].addEventListener( event, fn, false );
      }
    },
    // gets the index of the selected item
    getIndex: function() {
      var i;

      for ( i = 0; i < this.carouselListItems.length; i++ ) {
        if ( this.carouselListItems[i].className === "selected-item" ) {
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
        this.carouselList.style.marginLeft === this.slideBy;
      } else {
        this.updateMarkerToFirst();
        this.carouselList.style.marginLeft === 0;
      }
    },
    // go to previous slide
    prevSlide: function() {
      this.decreaseSlide();

      if ( this.marker === ( this.carouselListItems.length - 1 ) ) {
        this.updateMarkerToLast();
        this.carouselList.style.marginLeft === this.slideBy;
      } else {
        this.updateMarkerPrev();
        this.carouselList.style.marginLeft === this.slideBy;
      }
    }
  });
})( window.Polymer );
