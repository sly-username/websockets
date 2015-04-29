/*jshint strict: false*/

import define from "domain/ed/define-properties";
import dataService from "domain/ed/services/ed-data-service";

var datalist = Symbol( "datalist" );

export default class EDCollection {
  constructor( type, ids ) {
    Object.defineProperties( this, {
      ids: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: ids
      },
      type: {
        configurable: false,
        enumerable: false,
        writeable: false,
        value: type
      }
    });
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
    return this[ datalist ][ index ];
  }

  /**
   *
   * @method getRange
   * @param indexFrom { number }
   * @param indexTo { number }
   */
  getRange( indexFrom=0, indexTo ) {
    return this.ids.slice( indexFrom, indexTo ).map(( id, index ) => this.get( index ));
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
