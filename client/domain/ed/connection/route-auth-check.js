/*eslint consistent-this: 0 */

// add routes to this map with a boolean flag for needs auth true/false
var routeMap = {
  "profile/get": false
};

export default {
  needsAuth( route ) {
    if ( route in routeMap ) {
      return routeMap[ route ];
    }

    return false;
  }
};
