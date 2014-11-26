(function(Polymer, System) {

  Polymer("es6-elm", {
    attached: function(){
      var hello = System.get("../../../../domain/main.es6.js");
      this.addEventListener("click", function(evt){
        var name = this.getAttribute("my-name");
        hello(name);
      }.bind(this));
    }
  });

})(Polymer, System);
