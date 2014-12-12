/*eslint strict:0*/
// jscs:disable maximumLineLength
/***
 * This file contains paths for all the different files in the codebase.
 * Everything is absolute path'd starting from the __dirname of this file, which should
 * be at the root of the project directory
 ***/

var paths = {
  root:             __dirname,
  client:           __dirname + "/client",
  tests:            __dirname + "/tests",
  build:            __dirname + "/build",
  tasks:            __dirname + "/tasks",
  server:           __dirname + "/server",
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
      "/polymer/polymer.js",
      "/system.js/dist/system.js",
//      "/system.js/dist/system.src.js",
      "/system.js/dist/system.js.map",
      "/es6-module-loader/dist/es6-module-loader.js",
//      "/es6-module-loader/dist/es6-module-loader.src.js",
      "/es6-module-loader/dist/es6-module-loader.js.map"
    ].map( function( s ) { return paths.bowerComponents + s; }
    ).concat([
      // Stuff in node_modules
      "/traceur/bin/traceur-runtime.js"
    ].map( function( s ) { return paths.nodeModules + s; } ) ),
  min: [
      // Stuff in bower_components
      "/webcomponentsjs/webcomponents.min.js",
      "/polymer/polymer.min.js",
      "/system.js/dist/system.js",
      "/system.js/dist/system.js.map",
      "/es6-module-loader/dist/es6-module-loader.js",
      "/es6-module-loader/dist/es6-module-loader.js.map"
    ].map( function( s ) { return paths.bowerComponents + s; }
    ).concat([
      // Stuff in node_modules
      "/traceur/bin/traceur-runtime.js"
    ].map( function( s ) { return paths.nodeModules + s; } ) )
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

/*** LESS ***/
paths.less = {
  src: paths.client + "/**/*.less",
  out: {
    dev: paths.dev,
    prod: paths.prod
  },
  includePaths: [ "./client/styles/" ],
  skip: [ "/**/*.vars.less", "/**/*.mixin.less" ].map( function( s ) { return paths.client + s; }) // (s => paths.client + s)
};
paths.less.compile = paths.less.skip.map( function( s ) { return "!" + s; }).concat( paths.less.src );
// paths.less.compile = paths.less.skip.map( s => "!" + s ).concat(paths.less.src);

/*** JSCS ***/
paths.jscs = {
  rc: paths.root + "/.jscsrc",
  all: paths.root + "/**/*.js",
  client: paths.client + "/**/*.js",
  tasks: paths.tasks + "/**/*.js",
  tests: paths.tests + "/**/*.js",
  server: paths.server + "/**/*.js",
  root: [ "/*.js", "/.eslintrc", "/.jscsrc" ].map( function( s ) { return paths.root + s; })
};

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
