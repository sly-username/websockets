// import edDataService from "domain/ed/services/ed-data-service";

export default class EDCollection {
  constructor( type, ids ) {
    // TODO should ids be private?
    this.ids = ids;
    this.type = type;
    this.datalist = [];
  }

  get( index ) {
    if ( !this.datalist[ index ] instanceof Promise ) {
      this.datalist[ index ] = dataService.getByTypeAndId( this.type, this.ids[ index ] );
    }

    return this.datalist[ index ];
  }

  getRange( indexFrom=0, indexTo ) {
    Promise.all( this.datalist.slice( indexFrom, indexTo ) )
    .then( values => {
      values[ Symbol.iterator ]();
    })
    .catch( reason => {
      // should we concern ourselves with errors?
    });
  }

  getAll() {
    return this.getRange();
  }

  * [ Symbol.iterator ]( index=0 ) {
    while ( this.datalist ) {
      yield this.get( index ).bind( this );
      index++;
    }
  }
}
