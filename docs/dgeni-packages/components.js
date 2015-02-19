"use strict"
var path = require( "canonical-path" );
var Package = require( "dgeni" ).Package;

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

    // Add a folder to search for our own templates to use when rendering docs
    templateFinder.templateFolders.unshift( path.resolve( __dirname, "templates" ));

    // Specify how to match docs to templates.
    // In this case we just use the same static template for all docs
    templateFinder.templatePatterns.unshift( "common.template.html" );

    // Specify where the writeFilesProcessor will write our generated doc files
    writeFilesProcessor.outputFolder = "components";
  });
