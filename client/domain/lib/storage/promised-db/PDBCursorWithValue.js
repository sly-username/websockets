
import { default as PDBCursor, symbols } from "domain/lib/storage/promised-db/PDBCursor";

export default class PDBCursorWithValue extends PDBCursor {
  constructor( idbCursor, source=null ) {
    super( idbCursor, source );
  }

  get value() {
    return this[ symbols.originalCursor ].value;
  }
}
