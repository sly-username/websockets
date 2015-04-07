/*jshint strict: false */
/*eslint vars-on-top: 0*/
import EDDataObject from "domain/ed/objects/EDDataObject";
import ObservableLRUCache from "domain/lib/storage/ObservableLRUCache";

// helpers
var checkKeyType = function( tmpKey ) {
  return tmpKey instanceof EDDataObject ? tmpKey.id : tmpKey;
};

export default class EDLRUCache extends ObservableLRUCache {
  constructor( limit ) {
    super( limit );
  }

  /**
   * @method observe
   * @param key -- the key to observe on
   * @param callback {observerCallback} -- observer function
   * @param acceptList { Array<string> } -- list of actions to observe, accepted: "set" and "remove"
   * @returns {undefined}
   *
   * @description
   *    Checks if key passed is an instance of EDDataObject and if so,
   *    assigns key to the id of that instance. It then adds an observer
   *    callback for watching for changes to a specific key. Changes
   *    are only observed via set and remove operations, reordering
   *    an item in the internal linked list is not observable.
   */
  observe( key, callback, acceptList ) {
    key = checkKeyType( key );

    return super.observe( key, callback, acceptList );
  }

  /**
   *
   * @param key -- the key the callback is attached to
   * @param callback {function} -- the observer function to remove
   * @returns {undefined}
   *
   * @description
   *   Checks if key passed is an instance of EDDataObject and if so,
   *   assigns key to the id of that instance. Removes a listener from
   *   the internal list of observers.
   */
  unobserve( key, callback ) {
    key = checkKeyType( key );

    return super.unobserve( key, callback );
  }

  /**
   *
   * @param key -- the key the callback is attached to
   * @param data
   * @returns {*}
   *
   * @description
   *   Checks if key passed is an instance of EDDataObject and if so,
   *   assigns key to the id of that instance.
   */
  set( key, data ) {
    if ( key instanceof EDDataObject ) {
      key = key.id;
      data = key;
    }

    return super.set( key, data );
  }

  get( key ) {
    key = checkKeyType( key );

    return super.get( key );
  }

  peek( key ) {
    key = checkKeyType( key );

    return super.peek( key );
  }

  has( key ) {
    key = checkKeyType( key );

    return super.has( key );
  }

  remove( key ) {
    key = checkKeyType( key );

    return super.remove( key );
  }
}
