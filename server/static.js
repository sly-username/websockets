
var koa     = require('koa'),
    send    = require('koa-send'),
    fs      = require('fs'),
    config  = require('../config.paths.js'),
    servers = {
      dev: koa(),
      prod: koa()
    };

var serve = function(root, fallback){

  return function *(next){
    var stat;
    try{
      stat = fs.statSync(root+this.path);
      if( stat.isDirectory() ){
        throw new Error("Won't serve directory");
      }
      yield send(this, root+this.path);
    } catch (e) {
      //console.error(e);
      console.log('falling back for: ' + this.path);
      yield send(this, fallback);
    }

  };
};

servers.dev.use(serve(config.dev, config.server.fallback.dev));
servers.prod.use(serve(config.prod, config.server.fallback.prod));

module.exports = {
  get dev(){
    servers.dev.listen(config.server.ports.dev);
    return servers.dev;
  },
  get prod(){
    servers.dev.listen(config.server.ports.prod);
    return servers.prod;
  }
};
