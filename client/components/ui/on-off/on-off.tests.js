/*eslint-env mocha */
( function() {
  "use strict";
  var expect = chai.expect;

  suite( "Array", function() {
    suite( "#indexOf()", function() {
      test( "should return -1 when not present", function() {
        expect( [ 1, 2, 3 ].indexOf( 4 ) ).to.equal( -1 );
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
        expect( element )
          .to.have.property( "outerHTML" )
          .that.equals( "<on-off></on-off>" );
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
