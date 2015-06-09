/*jshint strict: false*/
var
  AdMob = window.AdMob,
  admobid = {},
  admobOptions = {
    // adSize: 'SMART_BANNER',
    // width: integer,
    // height: integer,
    position: AdMob.AD_POSITION.TOP_CENTER,
    // offsetTopBar: true, //iOS7+
    // bgColor: 'black',
    // x: integer,
    // y: integer,
    // overlap: true,
    isTesting: true, // TODO remove for production
    autoShow: false
  };

if ( /(android)/i.test(navigator.userAgent )) {
  admobid = {
    banner: "ca-app-pub-6485453766683902/8331842279"
  };
} else if ( /(ipod|iphone|ipad)/i.test(navigator.userAgent )) {
  admobid = {
    banner: "ca-app-pub-6485453766683902/8052640677"
  };
}

if ( AdMob ) {
  AdMob.setOptions( admobOptions );

  AdMob.createBanner({
    adId: admobid.banner
  });
} else {
  console.warn( "AdMob module ran, but AdMob object not ready" );
}
