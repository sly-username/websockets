// import edDataService from "domain/ed/services/ed-data-service";

var datalist = Symbol( "datalist" );

Object.defineProperties( EDCollection, {
  ids: {
    configurable: false,
    enumerable: false,
    get: function() {
      return ids;
    }
  },
  type: {
    configurable: false,
    enumerable: false,
    get: function() {
      return type;
    }
  }
});

export default class EDCollection {
  constructor( type, ids ) {

    // TODO do I still need to use "this"?
    this.ids = ids;
    this.type = type;
    this[ datalist ] = ids.slice( 0 );
  }

  /**
   *
   * @method get
   * @param index { number }
   * @returns {*}
   */
  get( index ) {
    if ( !( this[ datalist ][ index ] instanceof Promise ) ) {
      this[ datalist ][ index ] = dataService.getByTypeAndId( this.type, this.ids[ index ] );
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
    let promises = [];
    return Promise.all( this.datalist.slice( indexFrom, indexTo ) )
      .then( values => {
        promises.push( values[ Symbol.iterator ]() );
        return promises;
      })
      .catch( reason => {
        console.log( reason );
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
  * [ Symbol.iterator ]() {
    var index = 0,
      length = this.ids.length;

    while ( index < length ) {
      yield this.get( index );
      index += 1;
    }
  }
}
