var iterator = Symbol( "iterator" ),
  ids = [];

export default class EDCollection {
  constructor( ids, type ) {

  }

  get( index ) {

  }

  getRange( indexFrom, indexTo ) {

  }

  getAll() {
    return this.getRange();
  }

  * [ iterator ]( [param[, param[, ... param]]] ) {
    // statements
  }
}
