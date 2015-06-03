/*jshint strict: false*/
var
  AdMob = window.AdMob,
  admobid = {};

if ( AdMob ) {
  AdMob.createBanner({
    adId: "ca-app-pub-6485453766683902/8331842279",
    position: AdMob.AD_POSITION.TOP_CENTER,
    autoShow: false
  });
} else {
  console.warn( "AdMob module ran, but AdMob object not ready" );
}
