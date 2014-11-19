
var paths = {
  root:   __dirname,
  client: __dirname + "/client",
  tests:  __dirname + "/tests",
  build:  __dirname + "/build",
  bower:  __dirname + "/bower_components"
};

paths.dev = paths.build + "/www";
paths.prod = paths.build + "/prod";


/* VENDOR SCRIPTS */
paths.vendor = {
  dev: paths.dev + "/vendor",
  prod: paths.prod + "/vendor",
  src: [
    "/platform/platform.js",
    "/platform/platform.js.map",
    "/polymer/polymer.js",
    "/polymer/polymer.js.map"
  ].map(function(s){ return paths.bower+s; }),
  min: [
    "/platform/platform.js",
    "/platform/platform.js.map",
    "/polymer/polymer.js",
    "/polymer/polymer.js.map"
  ].map(function(s){ return paths.bower+s; })
};


/* LESS PATHS */
paths.less = {
  src:  paths.client + "/**/*.less",
  out:  {
    dev: paths.dev,
    prod: paths.prod
  },
  includePaths: [ './client/styles/' ],
  skip: ["/**/*.vars.less", "/**/*.mixin.less"].map(function(s){return paths.client + s; })
};
paths.less.compile = paths.less.skip.map(function(s){return "!"+s; }).concat(paths.less.src);


/* SERVER PATHS */
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


/* SYMLINK */
paths.symlink = {
  src: ["!**/*.less", "!**/*.md", paths.client + "/**/*.*"]//.map(function(s){return paths.client + s; })
};

/* TODO COPY */

/* TODO */

module.exports = paths;
