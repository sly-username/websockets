
import define from "domain/ed/define-properties";
import PDBObjectStore from "domain/lib/storage/db/PDBObjectStore";

export default class PDBDatabase {
  constructor( db ) {
    Object.defineProperties( this, {
      close: {
        configurable: false,
        enumberable: false,
        writeable: false,
        value: function() {
          return db.close();
        }
      }
    });

    define.readOnly( this, [ "name", "version" ], db );
    define.readOnlyDeep( this, [ "objectStoreNames" ], db );

    Array.from( db.objectStoreNames ).forEach( storeName => {
      Object.defineProperty( this, storeName, {
        configurable: false,
        enumberable: false,
        writeable: false,
        value: new PDBObjectStore(
          db.transaction( storeName, "readwrite" ).objectStore( storeName )
        )
      });
    });
  }
}
