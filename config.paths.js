
var paths = {
  root:             __dirname,
  client:           __dirname + "/client",
  tests:            __dirname + "/tests",
  build:            __dirname + "/build",
  bowerComponents:  __dirname + "/bower_components",
  nodeModules:      __dirname + "/node_modules"
};

paths.dev = paths.build + "/www";
paths.prod = paths.build + "/prod";


/*** VENDOR SCRIPTS ***/
paths.vendor = {
  dev: paths.dev + "/vendor",
  prod: paths.prod + "/vendor",
  src: [
      // Stuff in bower_components
      "/webcomponentsjs/webcomponents.js",
      "/polymer/polymer.js"
    ].map( function(s){ return paths.bowerComponents + s; }
    ).concat([
      // Stuff in node_modules
      "/traceur/bin/traceur-runtime.js"
    ].map( function(s){ return paths.nodeModules + s; } )),
  min: [
      // Stuff in bower_components
      "/webcomponentsjs/webcomponents.min.js",
      "/polymer/polymer.min.js"
    ].map( function(s){ return paths.bowerComponents + s; }
    ).concat([
      // Stuff in node_modules
      "/traceur/bin/traceur-runtime.js"
    ].map( function(s){ return paths.nodeModules + s; } ))
};


/*** SYMLINK ***/
paths.symlink = {
  src: [
    // don't link these
    "!**/*.less",     // less
    "!**/*.md",       // markdown
    "!**/*.es6.js",   // es6 js

    // link these
    paths.client + "/**/*.*"
  ]
};


/*** LESS PATHS ***/
paths.less = {
  src:  paths.client + "/**/*.less",
  out:  {
    dev: paths.dev,
    prod: paths.prod
  },
  includePaths: [ "./client/styles/" ],
  skip: ["/**/*.vars.less", "/**/*.mixin.less"].map(function(s){ return paths.client + s; }) // (s => paths.client + s)
};
paths.less.compile = paths.less.skip.map(function(s){ return "!"+s; }).concat(paths.less.src);
//paths.less.compile = paths.less.skip.map( s => "!" + s ).concat(paths.less.src);


/*** Traceur ES6 --> ES5 ***/
paths.traceur = {
  bin: paths.nodeModules + "/.bin/traceur",
  src: paths.client + "/**/*.es6.js",
  out: {
    dev: paths.dev,
    prod: paths.prod
  }
};


/*** SERVER PATHS ***/
paths.server = {
  ports: {
    dev: 5115,
    prod: 5116
  },
  fallback: {
    dev: paths.dev + "/index.html",
    prod: paths.prod + "/index.html"
  },
  watch: paths.dev
};


/*** TODO COPY (FOR PROD) ***/

/*** TODO ***/

// Export!
module.exports = paths;
