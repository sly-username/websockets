(function( Polymer ) {
  "use strict";

  var copyAttributes = function (elemFrom, elemTo, attrs) {
    attrs.forEach(function (attr) {
      if ( elemFrom.hasAttribute(attr) ) {
        elemTo.setAttribute(attr, elemFrom.getAttribute(attr));
      } else {
        elemTo.removeAttribute(attr);
      }
    });
  };

  Polymer("on-off", {
    get onText(){
      return this._onText;
    },
    set onText(value){
      this.attributes["on-text"].value = value;
      return this._onText = value;
    },
    get offText(){
      return this._offText;
    },
    set offText(value){
      this.attributes["off-text"].value = value;
      return this._offText = value;
    },
    ready: function () {
      //on-text off-text
      var labels = this.shadowRoot.querySelector(".labels"),
          checkedBox = this.shadowRoot.getElementById("checkbox");

      this.onText  = this.attributes["on-text"].value;
      this.offText = this.attributes["off-text"].value;

      copyAttributes(this, checkedBox, ["checked", "disabled"]);
    },
    attached: function () {
      var self = this,
          toggle = self.shadowRoot.querySelector("input[type=checkbox]");

      toggle.addEventListener("change", function() {
        var state = toggle.checked ? "on" : "off";

        self.fire("toggle", { msg: "toggle" });
        self.fire(state, { msg: state });

      });
    },
    attributeChanged: function (attrName, oldVal, newVal) {
      var checkbox = this.shadowRoot.getElementById("checkbox");

      switch ( attrName ) {
        case "on-text":
          this.onText = newVal;
          break;
        case "off-text":
          this.offText = newVal;
          break;
        case "disabled":
          // fallthrough
        case "checked":
          checkbox[newVal == null ? "removeAttribute" : "setAttribute"](attrName, "");
          break;
        default:
          // do nothing
          break;
      }
    }
  });

})( window.Polymer );
