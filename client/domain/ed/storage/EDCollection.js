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
    if ( !this[ datalist ][ index ] instanceof Promise ) {
      this[ datalist ][ index ] = dataService.getByTypeAndId( this.type, this[ ids ][index] );
    }

    return this[ datalist ][ index ];
  }

  getRange( indexFrom=0, indexTo ) {
    var newIds = this[ datalist ].slice( indexFrom, indexTo );

    indexTo = ( indexTo != null ) ? indexTo : newIds.length ;

    newIds[ Symbol.iterator ]( indexFrom );
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
