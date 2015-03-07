var size = Symbol( "size" ), // jshint ignore:line
    entry = Symbol( "entry" );

export default class LRUCache {
  constructor( limit ) {
    Object.defineProperty( this, "limit", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: limit
    });
    this.keyMap = {};
    this[size] = 0;
  }
  get size() {
    return this[size];
  }

  put( key, value ) {
    this[entry] = {
      key: key,
      value: value
    };
    this.keyMap[key] = this[entry];

    // login that links entry and tail to the object
    if ( this.tail ) {
      this.tail.newer = this[entry];
      this[entry].older = this.tail;
    } else {
      this.head = this[entry];
    }
    this.tail = this[entry];

    if ( this[size] === this.limit ) {
      return this.shift();
    } else {
      this[size]++;
    }
  }
  get( key, returnEntry ) {
    this[entry] = this.keyMap[key];

    if ( this[entry] === undefined ) {
      return;
    }

    if ( this[entry] === this.tail ) {
      return returnEntry ? this[entry] : this[entry].value;
    }

    if ( this[entry].newer ) {
      if ( this[entry] === this.head ) {
        this.head = this[entry].newer;
      }
      this[entry].newer.older = this[entry].older;
    }

    if ( this[entry].older ) {
      this[entry].older.newer = this[entry].newer;
    }
    this[entry].newer = undefined;
    this[entry].older = this.tail;

    if ( this.tail ) {
      this.tail.newer = this[entry];
    }
    this.tail = this[entry];
    return returnEntry ? this[entry] : this[entry].value;
  }
  find( key ) {
    return this.keyMap[key];
  }
  has( key ) {
    return this.keyMap[key] ? true : false;
  }
  shift() {
    this[entry] = this.head;

    if ( this[entry] ) {
      if ( this.head.newer ) {
        this.head = this.head.newer;
        this.head.older = undefined;
      } else {
        this.head = undefined;
      }
      this[entry].newer = this[entry].older = undefined;
      delete this.keyMap[ this[entry].key ];
    }
    return this[entry];
  }
  set( key, value ) {
    var oldvalue;
    this[entry] = this.get( key, true );

    if ( this[entry] ) {
      oldvalue = this[entry].value;
      this[entry].value = value;
    } else {
      oldvalue = this.put( key, value );

      if ( oldvalue ) {
        oldvalue = oldvalue.value;
      }
    }
    return oldvalue;
  }
  remove( key ) {
    this[entry] = this.keyMap[key];

    if ( !this[entry] ) {
      return;
    }
    delete this.keyMap[ this[entry].key];

    if ( this[entry].newer && this[entry].older ) {
      this[entry].older.newer = this[entry].newer;
      this[entry].newer.older = this[entry].older;
    } else if ( this[entry].newer ) {
      this[entry].newer.older = undefined;
      this.head = this[entry].newer;
    } else if ( this[entry].older ) {
      this[entry].older.newer = undefined;
      this.tail = this[entry].older;
    } else {
      this.head = this.tail = undefined;
    }

    this[size]--;
    return this[entry].value;
  }
  clear() {
    this.head = this.tail = undefined;
    this[size] = 0;
    this.keyMap = {};
  }
  keys() {
    var keys = [],
        i;

    for ( i in this.keyMap ) {
      keys.push( i );
    }
    return keys;
  }
  forEach( fn, context, startAtTail ) {
    if ( context === true ) {
      startAtTail = true;
      context = undefined;
    } else if ( typeof context !== "object" ) {
      context = self;
    }

    if ( startAtTail ) {
      this[entry] = this.tail;

      while ( this[entry] ) {
        fn.call( context, this[entry].key, this[entry].value, this );
        this[entry] = this[entry].older;
      }
    } else {
      this[entry] = this.head;

      while ( this[entry] ) {
        fn.call( context, this[entry].key, this[entry].value, this );
        this[entry] = this[entry].newer;
      }
    }
  }
  forEachReverse( fn, context ) {
    this.forEach( fn, context, false );
  }
  toJSON() {
    var s = [];

    while ( this.head ) {
      s.push({
        key: JSON.stringify( this.head.key ),
        value: JSON.stringify( this.head.value )
      });
      this.head = this.head.newer;
    }
    return s;
  }
  toString() {
    var s = "";
    this[entry] = this.head;

    while ( this[entry] ) {
      s += String( this[entry].key ) + ":" + this[entry].value;
      this[entry] = this[entry].newer;

      if ( this[entry] ) {
        s += " < ";
      }
    }
    return s;
  }
}
