/*global __dirname*/
/*eslint strict:0, key-spacing:0*/
// jscs:disable maximumLineLength
"use strict";
/***
 * This file contains paths for all the different files in the codebase.
 * Everything is absolute path'd starting from the __dirname of this file, which should
 * be at the root of the project directory
 ***/

var join = require( "path" ).join,
  paths = {
    root:             __dirname,
    client:           join( __dirname, "client" ),
    tests:            join( __dirname, "tests" ),
    build:            join( __dirname, "build" ),
    logs:             join( __dirname, "logs" ),
    tasks:            join( __dirname, "tasks" ),
    server:           join( __dirname, "server" ),
    bowerComponents:  join( __dirname, "bower_components" ),
    nodeModules:      join( __dirname, "node_modules" )
  };

paths.dev = join( paths.build, "www" );
paths.prod = join( paths.build, "prod" );
paths.covearge = join( paths.build, "coverage" );

/*** VENDOR SCRIPTS ***/
paths.vendor = {
  out: {
    dev: join( paths.dev, "vendor" ),
    prod: join( paths.prod, "vendor" )
  },
  src: [
      // Stuff in bower_components
      // Web Components Shim
      join( "webcomponentsjs", "webcomponents.js" ),

      // Polymer
      join( "polymer", "polymer.js" ),

      // SystemJS + source map
      join( "system.js", "dist", "system.js" ),
//      join( "system.js", "dist", "system.src.js" ),
      join( "system.js", "dist", "system.js.map" ),

      // ES6-Module-Loader + source map
      join( "es6-module-loader", "dist", "es6-module-loader.js" ),
//      join( "es6-module-loader", "dist", "es6-module-loader.src.js" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js.map" ),

      // Director (Routing)
      join( "director", "build", "director.js" )
    ].map( s => join( paths.bowerComponents, s )
    ).concat([
      // Stuff in node_modules
      join( "traceur", "bin", "traceur-runtime.js" )
    ].map( s => join( paths.nodeModules, s ) ) ),
  min: [
      // Stuff in bower_components
      join( "webcomponentsjs", "webcomponents.min.js" ),
      join( "polymer", "polymer.min.js" ),
      join( "system.js", "dist", "system.js" ),
      join( "system.js", "dist", "system.js.map" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js.map" ),
      join( "director", "build", "director.min.js" )
    ].map( s => join( paths.bowerComponents, s )
    ).concat([
      // Stuff in node_modules
      join( "traceur", "bin", "traceur-runtime.js" )
    ].map( s => join( paths.nodeModules, s ) ) ),
  tests: [
    // in node_modules
    join( "mocha", "mocha.js" ),
    join( "mocha", "mocha.css" ),
    join( "chai", "chai.js" ),
    join( "chai-as-promised", "lib", "chai-as-promised.js" ),
    join( "sinon", "pkg", "sinon.js" ),
    join( "sinon-chai", "lib", "sinon-chai.js" )
  ].map( p => join( paths.nodeModules, p ) )
};

/*** TODO COPY (FOR PROD) ***/

/*** SYMLINK ***/
paths.symlink = {
  src: [
    // link these
    join( paths.client, "**", "*.*" ),

    // don't link these
    // less, markdown, es6 js, test html,
    join( "!**", "*.less" ),
    join( "!**", "*.md" ),
    join( "!**", "*.es6.js" ),
    join( "!" + paths.client, "domain", "**", "*.js" ),
    join( "!**", "*.tests.html" ),
    join( "!**", "*.tests.js" ),
    join( "!**", ".new" )
  ],
  tests: [
    join( paths.client, "**", "*.tests.html" ),
    join( paths.client, "**", "*.tests.js" )
  ]
};

/*** LESS ***/
paths.less = {
  src: join( paths.client, "**", "*.less" ),
  out: {
    dev: paths.dev,
    prod: paths.prod
  },
  // todo double check in windows if '/' gets changed to '\'
  includePaths: [ join( "client", "styles", "/" ) ],
  included: [
    join( "styles", "mixins", "**", "*.less" ),
    join( "**", "*.vars.less" ),
    join( "**", "*.mixin.less" ),
    join( "**", "*.include.less" ),
    join( "**", "fonts", "*.less" )
  ].map( s => join( paths.client, s ) )
};
paths.less.compile = paths.less.included
  .map( s => join( "!", s ) )
  .concat( paths.less.src );

/*** Paths to JavaScript Files ***/
paths.scripts = {
  all:            [
    join( paths.root, "**", "*.js" ),
    join( "!", paths.bowerComponents ),
    join( "!", paths.nodeModules )
  ],
  client: join( paths.client, "**", "*.js" ),
  tasks: join( paths.tasks, "**", "*.js" ),
  tests: join( paths.tests, "**", "*.js" ),
  clientTests: [
    join( paths.client, "**", "*.tests.js" ),
    join( paths.client, "**", "*.tests.html" )
  ],
  server: join( paths.server, "**", "*.js" ),
  es6: {
    all: join( paths.root, "**", "*.es6.js" ),
    client: join( paths.client, "**", "*.es6.js" )
  }
};

/*** JSCS ***/
paths.jscs = {
  rc:     join( paths.root, ".jscsrc" ),
  all:    paths.scripts.all,
  client: paths.scripts.client,
  tasks:  paths.scripts.tasks,
  tests:  paths.scripts.tests,
  server: paths.scripts.server,
  root: [ "*.js", ".eslintrc", ".jscsrc" ].map( s => join( paths.root, s ) ),
  taskNames: [ "all", "client", "tasks", "tests", "server", "root" ]
};

/*** ESLINT ***/
paths.eslint = {
  rc:     join( paths.root, ".eslintrc" ),
  all:    paths.scripts.all,
  client: paths.scripts.client,
  tasks:  paths.scripts.tasks,
  tests:  paths.scripts.tests,
  server: paths.scripts.server,
  root: join( paths.root, "*.js" ),
  taskNames: [ "all", "client", "tasks", "tests", "server", "root" ]
};

/*** Traceur ES6 --> ES5 ***/
paths.traceur = {
  bin: join( paths.nodeModules, ".bin", "traceur" ),
  src: [
    join( paths.client, "**", "*.es6.js" ),
    join( paths.client, "domain", "**", "*.js" )
  ],
  compileAsScript: new RegExp( "^" + join( paths.client, "components" ) + "|\\.script\\.js$" ),
  out: {
    dev: paths.dev,
    prod: paths.prod
  }
};

/*** TESTING ***/
paths.testing = {
  index: join( paths.tests, "tests.html" ),
  client: {
    js: join( paths.client, "**", "*.tests.js" ),
    html: join( paths.client, "**", "*.tests.html" )
  },
  tests: join( paths.tests, "**", "*.js" )
};
paths.testing.client.all = Object.keys( paths.testing.client )
  .map( prop => paths.testing.client[ prop ] );

/*** KARMA ***/
paths.karma = {
  rc: join( paths.root, "karma.conf.js" ),
  base: paths.dev,
  port: 9876,
  coverage: {
    src: "**/!(vendor)/!(*.tests).js",
    out: {
      html: join( paths.dev, "coverage" ),
      lcov: join( paths.build, "coverage" )
    }
  },
  exclude: [
    "index.html",
    "tests.html",
    "**/.new/*.*",
    "**/ed-components.html",
    "**/ui-components.html",
    "coverage/**"
  ],
  files: ( function() {
    var files = [];

    // load vendor scripts in correct order
    [
      "webcomponents.js",
      "polymer.js",
      "traceur-runtime.js",
      "es6-module-loader.js",
      "system.js"
    ].forEach( function( vendor ) {
        files.push({
          pattern: join( "vendor", vendor ),
          watched: false,
          included: true,
          served: true
        });
      });

    // load html tests files
    files.push({
      pattern: "**/*.tests.html",
      watched: true,
      included: true,
      served: true
    });

    // Watch JS Files
    files.push({
      pattern: "**/*.js",
      watched: true,
      included: false,
      served: true
    });

    // Watch HTML Files
    files.push({
      pattern: "**/*.html",
      watched: true,
      included: false,
      served: true
    });

    // make sure everything else is served
    files.push({
      pattern: "**/*.*",
      watched: false,
      included: false,
      served: true
    });

    return files;
  })()
};

/*** LOGGING ***/
paths.logging = {
  gulp: join( paths.logs, "gulp" ),
  createDatedFilename: function( name, date ) {
    date = date || new Date();
    return date.getFullYear() + "-" +
      ( 1 + date.getMonth() ) + "-" +
      date.getDate() + "_" +
//      date.toTimeString().split( " " )[0].replace( /:/g, "-" ) + "_" +
      name + ".log";
  },
  createDatedLogFile: function( folder, name, date ) {
    return join( folder, paths.logging.createDatedFilename( name, date ) );
  }
};

/*** SERVER PATHS ***/
paths.server = {
  ports: {
    dev: 5115,
    prod: 5116
  },
  fallback: {
    dev: join( paths.dev, "index.html" ),
    prod: join( paths.prod, "index.html" )
  },
  watch: paths.dev
};

/*** TODO ***/

// Export!
module.exports = paths;
