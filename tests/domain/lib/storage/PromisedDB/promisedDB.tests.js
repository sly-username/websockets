/*eslint-env mocha*/
/*global suite, test, console*/
(function( win, doc, System, sinon, expect ) {
  "use strict";

  suite( "PromisedDB", function() {
    var promisedDB,
      PDBObjectStore;

    this.timeout( 5000 );

    suiteSetup(function( done ) {
      indexedDB.deleteDatabase( "testing-track-db" );
      indexedDB.deleteDatabase( "testing-track-db-2" );

      Promise.all([
        System.import( "domain/lib/storage/PromisedDB/promisedDB" ),
        System.import( "domain/lib/storage/PromisedDB/PDBDatabase" ),
        System.import( "domain/lib/storage/PromisedDB/PDBTransaction" ),
        System.import( "domain/lib/storage/PromisedDB/PDBObjectStore" ),
        System.import( "domain/lib/storage/PromisedDB/PDBIndex" )
      ])
        .then(function( imported ) {
          promisedDB = imported[ 0 ].default;
          PDBObjectStore = imported[ 3 ].default;

          done();
        }, function( error ) {
          console.warn( "Could not import 'PromisedDB' for testing: ", error.message );
          console.error( error.stack );
          done( error );
        });
    });

    // Start Test
    test( "construction with fully formed config object", function( done ) {
      var dbOpenRequest;

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
      }])
        .then(function( pdb ) {
          console.log( "testing-track-db constructed: %o", pdb );
          pdb.close();

          dbOpenRequest = indexedDB.open( "testing-track-db", 1 );
          dbOpenRequest.onsuccess = function( event ) {
            var idb = event.target.result,
              transaction = idb.transaction( "storeName", "readonly" ),
              store;

            transaction.oncomplete = function() {
              idb.close();
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
    });

    test( "construction with minimal config object", function( done ) {
      var dbOpenRequest;

      promisedDB.open( "testing-track-db-2", 1, [{
        storeName: {
          indexes: {
            type: [ "type" ],
            userId: [ "userId" ],
            profileId: [ "profileId" ]
          }
        }
      }]).then(function( pdb ) {
        console.log( "testing-track-db-2 constructed: %o", pdb );
        pdb.close();

        dbOpenRequest = indexedDB.open( "testing-track-db-2", 1 );
        dbOpenRequest.onsuccess = function( event ) {
          var idb = event.target.result,
            transaction = idb.transaction( "storeName", "readonly" ),
            store;

          transaction.oncomplete = function() {
            idb.close();
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
    });

    suite( "Own Properties & Symbols", function() {
      var pdb,
        config = [{
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
        }],
        seedData = [
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
        ];

      suiteSetup(function( done ) {
        var doneHelper = (function() {
          var count = 0;
          return function( arg ) {
            if ( ++count === 5 ) {
              done();
            }
          };
        })();

        promisedDB.open( "testing-track-db", 1, config ).then(function( createdPDB ) {
          pdb = createdPDB;

          seedData.forEach(function( entry ) {
            return pdb.storeName.add( entry ).then( doneHelper );
          });
        });
      });

      suiteTeardown(function() {
        pdb.close();
        promisedDB.deleteDatabase( pdb.name );
      });

      test( "promised db has property name", function() {
        expect( pdb )
          .to.have.property( "name" )
          .that.is.a( "string" )
          .and.equals( "testing-track-db" );
      });

      test( "promised db has property version", function() {
        expect( pdb )
          .to.have.property( "version" )
          .that.is.a( "number" )
          .and.equals( 1 );
      });

      config.forEach(function( versionConfig, versionNumber ) {
        versionNumber += 1;

        suite( "version number: " + versionNumber, function() {
          Object.keys( versionConfig ).forEach(function( storeName ) {
            suite( "objectStore: " + storeName, function() {
              test( "pdb has property objectStore: " + storeName, function() {
                expect( pdb )
                  .to.have.property( storeName )
                  .that.is.an.instanceof( PDBObjectStore ); // todo import this
              });

              suite( storeName + " has objectStore properties", function() {
                test( "indexNames", function() {
                  expect( pdb[ storeName ] )
                    .to.have.property( "indexNames" )
                    .that.is.an.instanceof( DOMStringList );
                });

                test( "keyPath", function() {
                  expect( pdb[ storeName ] )
                    .to.have.property( "keyPath" )
                    .that.is.a( "string" )
                    .and.equals( versionConfig[ storeName ].options.keyPath );
                });

                test( "name", function() {
                  expect( pdb[ storeName ] )
                    .to.have.property( "name" )
                    .that.is.a( "string" )
                    .and.equals( storeName );
                });

                test( "autoIncrement", function() {
                  expect( pdb[ storeName ] )
                    .to.have.property( "autoIncrement" )
                    .that.equals( versionConfig[ storeName ].options.autoIncrement );
                });
              });

              suite( storeName + " has objectStore methods", function() {
                var newData = {
                    id: 5,
                    type: "track",
                    userId: 3,
                    profileId: 8,
                    name: "Hunger of the Pine"
                  },
                  augmentedData = Object.assign( {}, seedData[1] );

                augmentedData.userId = 10;

                test( "add", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "add" );

                  pdb[ storeName ].add( newData )
                    .then(function( id ) {
                      expect( id ).to.equal( 5 );
                      done();
                    }).catch( done );
                });

                test( "delete", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "delete" );

                  pdb[ storeName ].delete( 5 )
                    .then(function( data ) {
                      expect( data )
                        .to.equal( undefined );

                      done();
                    })
                    .catch( done );
                });

                test.skip( "clear", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "clear" );
                  // todo, actually check if it works
                });

                test( "get", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "get" );

                  pdb[ storeName ].get( 0 )
                    .then(function( data ) {
                      expect( data )
                        .to.deep.equal( seedData[ 0 ] );

                      done();
                    }).catch( done );
                });

                test( "put", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "put" );

                  pdb[ storeName ].put( augmentedData )
                    .then(function( data ) {
                      expect( data )
                        .to.equal( augmentedData.id );

                      done();
                    }).catch( done );
                });

                test( "openCursor", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "openCursor" );

                  pdb[ storeName ].openCursor()
                    .then(function( cursor ) {
                      expect( cursor )
                        .to.be.instanceof( IDBCursor );

                      done();
                    }).catch( done );
                });

                test( "count", function( done ) {
                  expect( pdb[ storeName ] )
                    .to.respondTo( "count" );

                  pdb[ storeName ].count()
                    .then(function( count ) {
                      expect( count )
                        .to.equal( seedData.length );

                      done();
                    }).catch( done );
                });
              });

              suite( storeName + " has proper indexes", function() {
                Object.keys( versionConfig[ storeName ].indexes ).forEach(function( indexName ) {
                  suite( storeName + " index: " + indexName, function() {
                    test( "object store: " + storeName + " has index " + indexName, function() {
                      expect( pdb[ storeName ] )
                        .to.have.property( indexName );
                    });

                    suite( indexName + " has index properties", function() {
                      test( "name", function() {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.have.property( "name" )
                          .that.equals( indexName );
                      });

                      test( "keyPath", function() {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.have.property( "keyPath" )
                          .that.equals( versionConfig[ storeName ].indexes[ indexName ][ 0 ] );
                      });

                      test( "multiEntry", function() {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.have.property( "multiEntry" )
                          .that.equals( versionConfig[ storeName ].indexes[ indexName ][ 1 ].multiEntry );
                      });

                      test( "unique", function() {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.have.property( "unique" )
                          .that.equals( versionConfig[ storeName ].indexes[ indexName ][ 1 ].unique );
                      });
                    });

                    // TODO PROPER EXPECTS
                    suite( indexName + " has index methods", function() {
                      test( "count", function( done ) {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.respondTo( "count" );

                        pdb[ storeName ][ indexName ].count()
                          .then(function( count ) {
                            expect( count )
                              .to.be.a( "number" )
                              .and.equal( 5 );

                            done();
                          })
                          .catch( done );
                      });

                      test( "get", function( done ) {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.respondTo( "get" );

                        // TODO
                        pdb[ storeName ][ indexName ].get(
                          versionConfig[ storeName ].indexes[ indexName ][ 0 ]
                        )
                          .then(function( data ) {
                            expect( data )
                              .to.deep.equal( seedData[ 1 ] );

                            done();
                          })
                          .catch( done );
                      });

                      test( "getKey", function( done ) {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.respondTo( "getKey" );

                        // TODO
                        pdb[ storeName ][ indexName ].getKey(
                          versionConfig[ storeName ].indexes[ indexName ][ 0 ]
                        )
                          .then(function( data ) {
                            expect( data )
                              .to.equal( "something" );

                            done();
                          })
                          .catch( done );
                      });

                      test( "openCursor", function( done ) {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.respondTo( "openCursor" );

                        // TODO ?
                        pdb[ storeName ][ indexName ].openCursor()
                          .then(function( data ) {
                            expect( data )
                              .to.be.instanceof( IDBCursorWithValue );

                            done();
                          })
                          .catch( done );
                      });

                      test( "openKeyCursor", function( done ) {
                        expect( pdb[ storeName ][ indexName ] )
                          .to.respondTo( "openKeyCursor" );

                        // TODO ?
                        pdb[ storeName ][ indexName ].openKeyCursor()
                          .then(function( data ) {
                            expect( data )
                              .to.be.instanceof( IDBCursor );

                            done();
                          })
                          .catch( done );
                      });
                    }); // end index methods suite
                  }); // end storeName + indexName suite
                }); // end Object.keys( indexes )
              }); // end storeName has indexes suite
            }); // end object store suite
          }); // end versionConfig.keys.forEach
        }); // end version suite
      }); // end config.forEach
    });

    suite( "Methods", function() {});
  });
})( window, document, window.System, window.sinon, window.chai.expect );
