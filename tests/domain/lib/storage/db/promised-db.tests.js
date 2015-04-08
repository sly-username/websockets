/*eslint-env mocha*/
/*global suite, test, console*/
(function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "PromisedDB", function() {
    var promisedDB;

    this.timeout( 5000 );

    suiteSetup(function( done ) {
      indexedDB.deleteDatabase( "testing-track-db" );
      indexedDB.deleteDatabase( "testing-track-db-2" );

      System.import( "domain/lib/storage/db/promised-db" )
        .then(function( imported ) {
          promisedDB = imported.default;

          done();
        }, function( error ) {
          console.warn( "Could not import 'PromisedDB' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Start Test
    test( "construction with fully formed config object", function( done ) {
      var db;

      promisedDB.open( "testing-track-db", 1, [{
        storeName: {
          options: {
            keyPath: "id",
            autoIncrement: false
          },
          indexes: {
            type: [ "type", {
              unique: false,
              multiEntry: false
            }],
            userId: [ "userId", {
              unique: false,
              multiEntry: false
            }],
            profileId: [ "profileId", {
              unique: false,
              multiEntry: false
            }]
          }
        }
      }]).close();

      db = indexedDB.open( "testing-track-db", 1 );
      db.onsuccess = function( event ) {
        var idb = event.target.result,
          transaction = idb.transaction([ "testing-track-db" ], "readonly" ),
          store;

        transaction.oncomplete = function( trans ) {
          db.close();
          done();
        };

        store = transaction.objectStore( "storeName" );

        expect( store )
          .to.be.an.instanceOf( IDBObjectStore );

        expect( store )
          .to.have.property( "name" )
          .that.equals( "storeName" );
      };

      promisedDB.deleteDatabase( "testing-track-db" );
    });

    test( "construction with minimal config object", function( done ) {
      var db;

      promisedDB.open( "testing-track-db-2", 1, [{
        storeName: {
          indexes: {
            type: [ "type" ],
            userId: [ "userId" ],
            profileId: [ "profileId" ]
          }
        }
      }]).close();

      db = indexedDB.open( "testing-track-db-2", 1 );
      db.onsuccess = function( event ) {
        var idb = event.target.result,
          transaction = idb.transaction([ "testing-track-db-2" ], "readonly" ),
          store;

        transaction.oncomplete = function( trans ) {
          db.close();
          done();
        };

        store = transaction.objectStore( "storeName" );

        expect( store )
          .to.be.an.instanceOf( IDBObjectStore );

        expect( store )
          .to.have.property( "name" )
          .that.equals( "storeName" );
      };

      promisedDB.deleteDatabase( "testing-track-db-2" );
    });

    suite( "Own Properties & Symbols", function() {
      var db;

      suiteSetup(function( done ) {
        var data = [
            {
              id: 0,
              type: "track",
              userId: 0,
              profileId: 0,
              name: "After the Rain"
            },
            {
              id: 1,
              type: "track",
              userId: 0,
              profileId: 1,
              name: "Recommendation"
            },
            {
              id: 2,
              type: "track",
              userId: 1,
              profileId: 2,
              name: "Turn Left"
            },
            {
              id: 3,
              type: "track",
              userId: 2,
              profileId: 3,
              name: "Blinking Pigs"
            },
            {
              id: 4,
              type: "track",
              userId: 1,
              profileId: 4,
              name: "Howling at the Moon"
            }
          ],
          doneHelper = (function() {
            var count = 0;
            return function() {
              if ( ++count === 5 ) {
                done();
              }
            };
          })();

        db = promisedDB.open( "testing-track-db", 1, [{
          storeName: {
            options: {
              keyPath: "id",
              autoIncrement: false
            },
            indexes: {
              type: [ "type", {
                unique: false,
                multiEntry: false
              }],
              userId: [ "userId", {
                unique: false,
                multiEntry: false
              }],
              profileId: [ "profileId", {
                unique: false,
                multiEntry: false
              }]
            }
          }
        }]);

        data.forEach(function( entry ) {
          return db.objectStore.storeName.put( entry ).then( doneHelper );
        });
      });

      suiteTeardown(function() {
        db.close();
        promisedDB.deleteDatabase( db.name );
      });

      test( "db has property name", function() {
        expect( db )
          .to.have.property( "name" )
          .that.is.a( "string" )
          .and.equals( "testing-track-db" );
      });

      test( "db has property version", function() {
        expect( db )
          .to.have.property( "version" )
          .that.is.a( "number" )
          .and.equals( 1 );
      });

      test( "db has property objectStore", function() {
        expect( db )
          .to.have.property( "objectStore" );

        expect( db.objectStore )
          .to.have.property( "storeName" )
          .to.have.property( "indexes" );
      });
    });

    suite( "Methods", function() {});
  });
})( window, document, window.System, window.sinon, window.chai.expect );
