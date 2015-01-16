/*global __dirname*/
/*eslint strict:0, key-spacing:0*/
// jscs:disable maximumLineLength
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

/*** VENDOR SCRIPTS ***/
paths.vendor = {
  dev: join( paths.dev, "vendor" ),
  prod: join( paths.prod, "vendor" ),
  src: [
      // Stuff in bower_components
      join( "webcomponentsjs", "webcomponents.js" ),
      join( "polymer", "polymer.js" ),
      join( "system.js", "dist", "system.js" ),
//      join( "system.js", "dist", "system.src.js" ),
      join( "system.js", "dist", "system.js.map" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js" ),
//      join( "es6-module-loader", "dist", "es6-module-loader.src.js" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js.map" )
    ].map( function( s ) { return join( paths.bowerComponents, s ); }
    ).concat([
      // Stuff in node_modules
      join( "traceur", "bin", "traceur-runtime.js" )
    ].map( function( s ) { return join( paths.nodeModules, s ); } ) ),
  min: [
      // Stuff in bower_components
      join( "webcomponentsjs", "webcomponents.min.js" ),
      join( "polymer", "polymer.min.js" ),
      join( "system.js", "dist", "system.js" ),
      join( "system.js", "dist", "system.js.map" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js" ),
      join( "es6-module-loader", "dist", "es6-module-loader.js.map" )
    ].map( function( s ) { return join( paths.bowerComponents, s ); }
    ).concat([
      // Stuff in node_modules
      join( "traceur", "bin", "traceur-runtime.js" )
    ].map( function( s ) { return join( paths.nodeModules, s ); } ) )
};

/*** TODO COPY (FOR PROD) ***/

/*** SYMLINK ***/
paths.symlink = {
  src: [
    // don't link these
    // less, markdown, es6 js,
    join( "!**", "*.less" ),
    join( "!**", "*.md" ),
    join( "!**", "*.es6.js" ),

    // link these (everything else)
    join( paths.client, "**", "*.*" )
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
    join( "**", "*.vars.less" ),
    join( "**", "*.mixin.less" ),
    join( "**", "*.include.less" ),
    join( "**", "fonts", "*.less" )
  ].map( function( s ) { return join( paths.client, s ); })
};
paths.less.compile = paths.less.included.map( function( s ) { return join( "!", s ); }).concat( paths.less.src );
// paths.less.compile = paths.less.included.map( s => join( "!", s ) ).concat(paths.less.src);

/*** Paths to JavaScript Files ***/
paths.scripts = {
  // todo add proper ignore for node_modules and bower_components
  all:    join( paths.root, "**", "*.js" ),
  client: join( paths.client, "**", "*.js" ),
  tasks:  join( paths.tasks, "**", "*.js" ),
  tests:  join( paths.tests, "**", "*.js" ),
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
  root: [ "*.js", ".eslintrc", ".jscsrc" ].map( function( s ) { return join( paths.root, s ); }),
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
  src: join( paths.client, "**", "*.es6.js" ),
  out: {
    dev: paths.dev,
    prod: paths.prod
  }
};

/*** LOGGING ***/
paths.logging = {
  gulp: join( paths.logs, "gulp" ),
  createDatedFilename: function( name, date ) {
    date = date || new Date();
    return date.getFullYear() + "_" +
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
