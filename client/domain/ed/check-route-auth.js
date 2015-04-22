/*eslint consistent-this: 0 */

export default {
  needsAuth( route ) {
    if ( route != null ) {
      return [ "profile/get", "" ].some( authRoute => {
        return authRoute === route;
      });
    }

    return false;
  }
};
