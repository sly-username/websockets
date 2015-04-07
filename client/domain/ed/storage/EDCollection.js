//import edDataService from "domain/ed/services/ed-data-service";

var iterator = Symbol( "iterator" );

export default class EDCollection {
  constructor( ids, type ) {
    this.ids = ids;
    // should ids be private?
    this.type = type;

  }

  get( index ) {
    if ( this.ids[ index ] instanceof EDDataObject ) {
      return ids[ index ];
    }

    if ( typeof this.ids[ index ] !== "string" ) {
      Promise.resolve( this.ids[ index ] )
        .then( val => {
          return edDataService.getDataObjectById( val )
            // TODO made up function name
            .then( dataObj => {
              return this.ids[ index ] = dataObj;
            });
        });
    }

    return edDataService.getDataObjectById( this.ids[ index ] )
      .then( function( dataObj ) {
        return this.ids[ index ] = dataObj;
      });
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
