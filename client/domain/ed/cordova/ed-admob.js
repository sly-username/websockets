/*jshint strict: false*/
var
  AdMob = window.AdMob,
  admobid = {},
  router = router = document.getElementById( "root-app-router" ),
  admobOptions = {
    // adSize: 'SMART_BANNER',
    position: AdMob.AD_POSITION.TOP_CENTER,
    offsetTopBar: true //iOS7+
    // bgColor: 'black',
    // x: integer,
    // y: integer,
    // overlap: true,
    // isTesting: true
  },
  showAdMob = function( action ) {
    if ( AdMob && AdMob.createBanner && AdMob.removeBanner ) {
      switch ( action ) {
        case true:
          AdMob.setOptions( admobOptions );

          AdMob.createBanner({
            adId: admobid.banner,
            autoShow: true
          });
          break;
        case false:
          AdMob.removeBanner();
          break;
        default:
          break;
      }
    } else {
      console.warn( "AdMob module ran, but AdMob object not ready" );
    }
  },
  setAdMobIds = function() {
    if ( /(android)/i.test( navigator.userAgent )) {
      admobid = {
        banner: "ca-app-pub-6485453766683902/8331842279"
      };
    } else if ( /(ipod|iphone|ipad)/i.test( navigator.userAgent )) {
      admobid = {
        banner: "ca-app-pub-6485453766683902/8052640677"
      };
    }
  };

setAdMobIds();

router.addEventListener( "activate-route-start", function( event ) {
  if ( event.detail.path === "/charts" ) {
    showAdMob( true );
  } else {
    showAdMob( false );
  }
});
