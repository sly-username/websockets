export default {
  get path() {
    return "wss://api.eardish.com";
  },

  get aws() {
    return {
      bucket: "eardish.prd.images"
    }
  }
}
