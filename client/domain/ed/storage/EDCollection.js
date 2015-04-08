//import edDataService from "domain/ed/services/ed-data-service";

var idFlag = false;

export default class EDCollection {
  constructor( ids, type ) {
    // TODO should ids be private?
    this.ids = ids;
    this.type = type;

    idFlag = this.id.length ? true : false;
  }

  get( index ) {
    if ( this.ids[ index ] instanceof EDDataObject ) {
      return this.ids[ index ];
    }

    if ( typeof this.ids[ index ] !== "string" ) {
      Promise.resolve( this.ids[ index ] )
        .then( val => {
          // TODO since below is made up function name
          return edDataService.getDataObjectById( val )
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

  getRange( indexFrom=0, indexTo ) {
    // deal with default values

    // slice this.ids to the new range

    this.ids[ Symbol.iterator ]( indexFrom );
  }

  getAll() {
    return this.getRange();
  }

  * [ Symbol.iterator ]( index=0 ) {
    while ( idFlag ) {
      yield get( index );
      index++;
    }
  }
}
