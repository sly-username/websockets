(function(Polymer, System) {

  Polymer("es6-elm", {
    attached: function(){
      // Using the promise based "System.import"
      System.import("domain/main.es6.js").then(function(main){
        main = main.default;
        this.addEventListener("click", function(evt){
          var name = this.getAttribute("my-name");
          main(name);
        }.bind(this));
      }.bind(this));
    }
  });

})(window.Polymer, window.System);
