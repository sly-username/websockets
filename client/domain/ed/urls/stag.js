export default {
  get path() {
    return "ws://apistg.eardish.com";
  },

  get aws() {
    return {
      bucket: "eardish.stg.images"
    }
  }
}
