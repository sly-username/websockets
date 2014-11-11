
var paths = {
  root:   __dirname,
  client: __dirname + '/client',
  tests:  __dirname + '/tests',
  build:  __dirname + '/build'
};

/* LESS PATHS */
paths.less = {
  src:  paths.client + '/**/*.less',
  out:  paths.build,
  include: ['/**/*.vars.less', '/**/*.mixin.less'].map(function(s){return paths.client + s; })
};
paths.less.compile = paths.less.include.map(function(s){return '!'+s; }).concat(paths.less.src);

/* TODO SERVER PATHS */

/* TODO SYMLINK *

/* TODO COPY */

/* TODO */

module.exports = paths;
