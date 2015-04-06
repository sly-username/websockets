
import PDBRequest from "domain/lib/storage/promised-db/PDBRequest";

export default class PDBOpenDBRequest extends PDBRequest {
  constructor( idbOpenDBRequest, source=null ) {
    super( idbOpenDBRequest, source );

    Object.defineProperty( this, "upgradeNeeded", {
      configurable: false,
      enumerable: false,
      writeable: false,
      value: new Promise(( resolve, reject ) => {
        idbOpenDBRequest.onupgradeneeded = resolve;
        idbOpenDBRequest.onblocked = reject;
      })
    });
  }
}
