var readOnly = function( value ) {
    return {
      configurable: false,
      enumerable: false,
      writeable: false,
      value
    };
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
  };

export default {
  readOnly( self, keys, valueMap ) {
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = readOnly( valueMap[ key ] );
      return props;
    }, {}));
  },
  enumReadOnly( self, keys, valueMap ) {
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = enumRO( valueMap[ key ] );
      return props
    }, {}));
  },
  configReadOnly( self, keys, valueMap ) {
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = configRO( valueMap[ key ] );
      return props;
    }, {}));
  },
  configEnumReadOnly( self, keys, valueMap ) {
    Object.defineProperties( self, keys.reduce(( props, key ) => {
      props[ key ] = configEnumRO( valueMap[ key ] );
      return props;
    }, {}));
  }
};
