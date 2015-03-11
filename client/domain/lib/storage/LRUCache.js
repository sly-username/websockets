var size = Symbol( "size" ), // jshint ignore:line
    tail = Symbol( "tail" ),
    head = Symbol( "head" ),
    keyMap = Symbol( "keyMap" );

export class LRUNode {
  constructor( key, data, newer, older ) {
    this.key = key;
    this.data = data;
    this.newer = newer;
    this.older = older;
  }
}

export default class LRUCache {
  constructor( limit ) {
    Object.defineProperty( this, "limit", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: limit
    });

    this[keyMap] = {};
    this[size] = 0;
    this[tail] = null;
    this[head] = null;
  }
  get size() {
    return this[size];
  }

  set( key, data ) {
    var myNode,
        newNode = new LRUNode( key, data, null, null );

    if ( this[tail] ) {
      myNode =  new LRUNode( key, data, null, this[tail].key );
      this[ keyMap ][ key ] = myNode;
    } else {
      this[ keyMap ][ key ] = newNode;
    }

    if ( this[tail] ) {
      this[tail].newer = myNode;
      myNode.older = this[tail];
    } else {
      this[head] = newNode;
    }
    this[tail] = this[tail] ? myNode : newNode;

    if ( this[size] === this.limit ) {
      return this.shift();
    } else {
      this[size]++;
      return null;
    }
  }
  get( key, returnEntry ) {
    var myNode = new LRUNode( key, this[keyMap][key].data, null, this[tail].key );

    myNode = this[keyMap][key];

    if ( myNode === undefined ) {
      return;
    }

    if ( myNode === this[tail] ) {
      return returnEntry ? myNode : myNode.data;
    }

    if ( myNode.newer ) {
      if ( myNode === this[head] ) {
        this[head] = myNode.newer;
      }
      myNode.newer.older = myNode.older;
    }

    if ( myNode.older ) {
      myNode.older.newer = myNode.newer;
    }
    myNode.newer = undefined;
    myNode.older = this[tail];

    if ( this[tail] ) {
      this[tail].newer = myNode;
    }
    this[tail] = myNode;
    return returnEntry ? myNode : myNode.data;
  }
  peek( key ) {
    return this[keyMap][key];
  }
  has( key ) {
    return this[keyMap][key] ? true : false;
  }
  shift() {
    var oldHead;

    if ( this[head] ) {
      oldHead = this[head];

      if ( this[head].newer ) {
        this[head] = this[head].newer;
        this[head].older = undefined;
      } else {
        this[head] = undefined;
      }

      delete this[keyMap][ oldHead.key ];
    }

    if ( this[keyMap] ) {
      return oldHead;
    } else {
      return null;
    }
  }
  remove( key ) {
    var myNode = this[keyMap][key];

    if ( !myNode ) {
      return null;
    }
    delete this[keyMap][ myNode.key];

    if ( myNode.newer && myNode.older ) {
      myNode.older.newer = myNode.newer;
      myNode.newer.older = myNode.older;
    } else if ( myNode.newer ) {
      myNode.newer.older = undefined;
      this[head] = myNode.newer;
    } else if ( myNode.older ) {
      myNode.older.newer = undefined;
      this[tail] = myNode.older;
    } else {
      this[head] = this[tail] = undefined;
    }

    this[size]--;
    return myNode.data;
  }
  clear() {
    this[head] = this[tail] = undefined;
    this[size] = 0;
    this[keyMap] = {};
  }
  keys() {
    var keys = [],
        i;

    for ( i in this[keyMap] ) {
      keys.push( i );
    }
    return keys;
  }
  forEach( fn, context, startAtTail ) {
    var iterator = startAtTail === true ? this.reverse : this;

    if ( context === true ) {
      startAtTail = true;
      context = undefined;
    } else if ( typeof context !== "object" ) {
      context = self;
    }

    for ( let [ key, data ] of iterator ) {
      fn.call( context || undefined, key, data, this );
    }

  }
  toArray() {
    var s = [];

    for ( let [ key, data ] of this ) {
      s.push({
        key,
        data
      })
    }
    return s;
  }
  toString() {
    var s = "";

    for ( let [ key, data ] of this ) {
      s += String( key ) + ":" + data;
      s += " < ";
    }
    return s;
  }
  * [Symbol.iterator]() {
    var currentNode = this[ head ];

    while ( currentNode ) {
      yield [ currentNode.key, currentNode.data ];
      currentNode = currentNode.newer;
    }
  }
  get reverse() {
    var self = this;
    return function* () {
      var currentNode = self[ tail ];

      while ( currentNode ) {
        yield [ currentNode.key, currentNode.data ];
        currentNode = currentNode.older;
      }
    };
  }
}
