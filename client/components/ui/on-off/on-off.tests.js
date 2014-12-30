/*eslint-env mocha */
( function() {
  "use strict";
  suite( "Array", function() {
    suite( "#indexOf()", function() {
      test( "should return -1 when not present", function() {
        chai.assert.equal( -1, [ 1, 2, 3 ].indexOf( 4 ) );
      });
    });
  });

  suite( "<on-off>", function() {
    var element;
    setup( function() {
      element = document.createElement( "on-off" );
    });
    suite( "life cycle", function() {
      test( "ready: can create from document.createElement", function() {
        chai.assert.equal( "<on-off></on-off>", element.outerHTML );
      });
    });
    /*
    suite( "attributes", function() {
      test( "on-text", function() {

      });
    });
    */
  });
})();
