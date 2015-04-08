// import edDataService from "domain/ed/services/ed-data-service";

var idFlag = false;

export default class EDCollection {
  constructor( [ ids ], type ) {
    // TODO should ids be private?
    this.ids = [ ids ];
    this.type = type;

    idFlag = this.id.length ? true : false;
  }

  get( index ) {
    // datalist is the array of promises

    // check if it has been called
    // if ( this[ datalist ][ index ] instanceof Promise )
    this[ datalist ][ index ] = dataService.getByTypeAndId( this.type, this[ ids ][index] );

    return this[ datalist ][ index ];
  }

  getRange( indexFrom=0, indexTo ) {
    var newIds = this.ids.slice( indexFrom, indexTo );

    indexTo = ( indexTo != null ) ? indexTo : newIds.length ;

    newIds[ Symbol.iterator ]( indexFrom );
  }

  getAll() {
    return this.getRange();
    // also return all the items in promise, and not the array of promises
    // if all true, returns single promise
  }

  * [ Symbol.iterator ]( index=0 ) {
    while ( idFlag ) {
      yield get( index );
      index++;
    }
  }
}
