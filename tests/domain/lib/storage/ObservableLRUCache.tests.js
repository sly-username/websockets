/*eslint-env mocha*/
/*global suite, test, console*/
( function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "ObservableLRUCache", function() {
    var ObservableLRUCache,
      keyMap, size, tail, head,
      observers;

    this.timeout( 5000 );

    suiteSetup( function( done ) {
      System.import( "domain/lib/storage/ObservableLRUCache" )
        .then( function( imported ) {
          var syms;

          ObservableLRUCache = imported.default;

          syms = Object.getOwnPropertySymbols( new ObservableLRUCache( 3 ) );

          keyMap = syms[ 0 ];
          size = syms[ 1 ];
          tail = syms[ 2 ];
          head = syms[ 3 ];
          observers = syms[ 4 ];

          done();
        }, function( error ) {
          console.warn( "Could not import 'LRUCache' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Start Test
    suite( "Inherits from LRUCache", function() {
      var cache;

      setup( function() {
        cache = new ObservableLRUCache( 10 );
      });

      teardown( function() {
        cache = null;
      });

      test( "has inherited property limit", function() {
        expect( cache )
          .to.have.property( "limit" )
          .to.be.a( "number" )
          .that.equals( 10 );
      });

      test( "has inherited property size", function() {
        expect( cache )
          .to.have.property( "size" )
          .to.be.a( "number" )
          .that.equals( 0 );
      });

      test( "has inherited symbol keyMap", function() {
        expect( cache )
          .to.have.property( keyMap )
          .to.be.a( "object" );
      });

      test( "has inherited symbol head", function() {
        expect( cache )
          .to.have.property( head )
          .to.be.equal( null );
      });

      test( "has inherited symbol tail", function() {
        expect( cache )
          .to.have.property( tail )
          .to.be.equal( null );
      });

      test( "has inherited method set", function() {
        expect( cache )
          .to.have.property( "set" )
          .that.is.a( "function" );
      });

      test( "has inherited method get", function() {
        expect( cache )
          .to.have.property( "get" )
          .that.is.a( "function" );
      });

      test( "has inherited method peek", function() {
        expect( cache )
          .to.have.property( "peek" )
          .that.is.a( "function" );
      });

      test( "has inherited method has", function() {
        expect( cache )
          .to.have.property( "has" )
          .that.is.a( "function" );
      });

      test( "has inherited method shift", function() {
        expect( cache )
          .to.have.property( "shift" )
          .that.is.a( "function" );
      });

      test( "has inherited method remove", function() {
        expect( cache )
          .to.have.property( "remove" )
          .that.is.a( "function" );
      });

      test( "has inherited method clear", function() {
        expect( cache )
          .to.have.property( "clear" )
          .that.is.a( "function" );
      });

      test( "has inherited method keys", function() {
        expect( cache )
          .to.have.property( "keys" )
          .that.is.a( "function" );

        expect( cache.keys() )
          .to.be.an.instanceof( Array );
      });

      test( "has inherited method forEach", function() {
        expect( cache )
          .to.have.property( "forEach" )
          .that.is.a( "function" );
      });

      test( "has inherited method toArray", function() {
        expect( cache )
          .to.have.property( "toArray" )
          .that.is.a( "function" );

        expect( cache.toArray() )
          .to.be.an.instanceof( Array );
      });

      test( "has inherited method toString", function() {
        expect( cache )
          .to.have.property( "toString" )
          .that.is.a( "function" );

        expect( cache.toString() )
          .to.be.a( "string" );
      });

      test( "has inherited default iterator", function() {
        expect( cache )
          .to.have.property( Symbol.iterator )
          .that.is.a( "function" );
      });

      test( "has inherited iterator reverse", function() {
        expect( cache )
          .to.have.property( "reverse" )
          .that.is.a( "function" );
      });
    });

    suite( "Properties", function() {
      var cache;

      setup( function() {
        cache = new ObservableLRUCache( 3 );
      });

      teardown( function() {
        cache = null;
      });

      test( "has object map for holding observer functions", function() {
        expect( cache )
          .to.have.property( observers )
          .that.is.an( "object" )
          .and.deep.equals( {} );
      });
    });

    suite( "Methods", function() {
      suite( "observe", function() {
        var cache;

        setup( function() {
          cache = new ObservableLRUCache( 5 );

          cache.set( "one", 1 );
          cache.set( "two", 2 );
          cache.set( "three", 3 );
        });

        teardown( function() {
          cache = null;
        });

        test( "observe adds callback to Symbol( observers )", function() {
          var observeFn = function() {};

          cache.observe( "one", observeFn );

          expect( cache )
            .to.have.property( observers )
            .that.has.property( "one" )
            .that.contains( observeFn );
        });

        test( "observe functions get a list of changes", function( done ) {
          var observeFn = function( changeList ) {
            expect( changeList )
              .to.be.an.instanceof( Array );

            done();
          };

          cache.observe( "one", observeFn );
          cache.set( "one", "one" );
        });

        test( "changes in the list of changes look like change objects used in Object.observe spec", function( done ) {
          var observeFn = function( changeList ) {
            var change = changeList[ 0 ];

            expect( change )
              .to.be.a( "object" );

            expect( change )
              .to.have.property( "name" )
              .that.equals( "one" );

            expect( change )
              .to.have.property( "object" )
              .that.equals( "one" );

            expect( change )
              .to.have.property( "type" )
              .that.equals( "set" );

            expect( change )
              .to.have.property( "oldValue" )
              .that.equals( 1 );

            done();
          };

          cache.observe( "one", observeFn );
          cache.set( "one", "one" );
        });

        test( "can specify, only observe 'set' operations", function() {
          var observeFn = sinon.spy();

          cache.observe( "one", observeFn, [ "set" ] );
          cache.remove( "one" );

          expect( observeFn )
            .to.have.callCount( 0 );

          cache.set( "one", "one" );

          expect( observeFn )
            .to.have.callCount( 1 );
        });

        test( "can specify, only observe 'remove' operations", function() {
          var observeFn = sinon.spy();

          cache.observe( "one", observeFn, [ "remove" ] );
          cache.set( "one", "one" );

          expect( observeFn )
            .to.have.callCount( 0 );

          cache.remove( "one" );

          expect( observeFn )
            .to.have.callCount( 1 );
        });
      });

      suite( "unobserve", function() {
        var cache;

        setup( function() {
          cache = new ObservableLRUCache( 5 );

          cache.set( "one", 1 );
          cache.set( "two", 2 );
          cache.set( "three", 3 );
        });

        teardown( function() {
          cache = null;
        });

        test( "unobserve, removes observer functions", function() {
          var observer1 = function() {},
            observer2 = function() {};

          cache.observe( "one", observer1 );
          cache.observe( "one", observer2 );

          expect( cache[ observers ] )
            .to.have.property( "one" )
            .that.deep.equals([ observer1, observer2 ]);

          cache.unobserve( "one", observer1 );

          expect( cache[ observers ] )
            .to.have.property( "one" )
            .that.deep.equals([ observer2 ]);
        });

        test( "unobserve, removes key from Symbol( observers ) if last observer is removed", function() {
          var observeFn = function() {};

          cache.observe( "one", observeFn );

          expect( cache[ observers ] )
            .to.have.property( "one" )
            .that.contains( observeFn );

          cache.unobserve( "one", observeFn );

          expect( cache[ observers ] )
            .to.not.have.property( "one" );
        });
      });
    });
  });
})( window, document, window.System, window.sinon, window.chai.expect );




































