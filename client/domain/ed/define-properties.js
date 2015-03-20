/*eslint consistent-this: 0 */
var readOnly = function( value ) {
    return {
      configurable: false,
      enumerable: false,
      writeable: false,
      value
    };
  },
  readOnlySealObjects = function( value ) {
    value = typeof value === "object" ? Object.freeze( value ) : value;
    return readOnly( value );
  },
  enumRO = function( value ) {
    return {
      configurable: false,
      enumerable: true,
      writeable: false,
      value
    };
  },
  configRO = function( value ) {
    return {
      configurable: true,
      enumerable: false,
      writeable: false,
      value
    };
  },
  configEnumRO = function( value ) {
    return {
      configurable: true,
      enumerable: true,
      writeable: false,
      value
    };
  },
  defineViaReduceWithFunction = function( self, keys, valueMap, configCreator ) {
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = configCreator( valueMap[ key ] );
      return props;
    }, {}));
  };

export default {
  readOnly( self, keys, valueMap ) {
    defineViaReduceWithFunction( self, keys, valueMap, readOnly );
    /*
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = readOnly( valueMap[ key ] );
      return props;
    }, {}));
    */
  },
  readOnlyDeep( self, keys, valueMap ) {
    defineViaReduceWithFunction( self, keys, valueMap, readOnlySealObjects );
  },
  enumReadOnly( self, keys, valueMap ) {
    defineViaReduceWithFunction( self, keys, valueMap, enumRO );
  },
  configReadOnly( self, keys, valueMap ) {
    defineViaReduceWithFunction( self, keys, valueMap, configRO );
  },
  configEnumReadOnly( self, keys, valueMap ) {
    defineViaReduceWithFunction( self, keys, valueMap, configEnumRO );
  }
};
