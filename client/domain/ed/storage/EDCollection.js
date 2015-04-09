// import edDataService from "domain/ed/services/ed-data-service";

export default class EDCollection {
  constructor( type, ids ) {
    var deepCopy = function( ids ) {
      var cloned = [];

      ids.forEach( function( element ) {
        cloned.push( element );
      });
      return cloned;
    };
    // TODO should ids be private?
    this.ids = ids;
    this.type = type;
    this.datalist = [];
    deepCopy( this.ids );
  }

  /**
   *
   * @method get
   * @param index { number }
   * @returns {*}
   */
  get( index ) {
    if ( !this.datalist[ index ] instanceof Promise ) {
      this.datalist[ index ] = dataService.getByTypeAndId( this.type, this.ids[ index ] );
    }

    return this.datalist[ index ];
  }

  /**
   *
   * @method getRange
   * @param indexFrom { number }
   * @param indexTo { number }
   */
  getRange( indexFrom=0, indexTo ) {
    return Promise.all( this.datalist.slice( indexFrom, indexTo ) )
      .then( values => {
        values[ Symbol.iterator ]();
      })
      .catch( reason => {
        // should we concern ourselves with errors?
      });
  }

  /**
   *
   * @method getAll
   * @returns {*}
   */
  getAll() {
    return this.getRange();
  }

  /**
   *
   * @method [ Symbol.iterator ]
   * @param index { number }
   */
  * [ Symbol.iterator ]( index=0 ) {
    while ( this.datalist ) {
      yield this.get( index ).bind( this );
      index++;
    }
  }
}
