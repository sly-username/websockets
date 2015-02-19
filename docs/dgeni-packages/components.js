"use strict"
var path = require( "canonical-path" ),
    Package = require( "dgeni" ).Package;

module.exports = new Package( "components", [
  require( "dgeni-packages/jsdoc" ),
  require( "dgeni-packages/nunjucks" )
])

  .config( function( log, readFilesProcessor, templateFinder, writeFilesProcessor ) {

    log.level = "info";

    readFilesProcessor.basePath = path.resolve( __dirname, ".." );

    readFilesProcessor.sourceFiles = [
      {
        include: "../components/**/*.js",
        exclude: "../components/.new/*.js",
        basePath: "components"
      }
    ];

    templateFinder.templateFolders.unshift( path.resolve( __dirname, "templates" ) );

    templateFinder.templatePatterns.unshift( "common.template.html" );

    writeFilesProcessor.outputFolder = "components";
  });
