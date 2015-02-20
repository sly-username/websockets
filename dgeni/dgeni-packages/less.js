"use strict";
var config = require( "../../config.paths.js" ),
    Package = require( "dgeni" ).Package,
    lessPackage = module.exports = new Package( "less", [
  require( "dgeni-packages/jsdoc" ),
  require( "dgeni-packages/nunjucks" )
]);

lessPackage.factory( require( "dgeni-less/file-readers/less" ) );
lessPackage.processor( require( "dgeni-less/processors/extract-less-comments" ) );

lessPackage.config( function( log, readFilesProcessor, templateFinder, writeFilesProcessor ) {
  log.level = "info";
  readFilesProcessor.basePath = config.dgeni.components.basePath;
  readFilesProcessor.sourceFiles = config.dgeni.components.src;
  templateFinder.templateFolders.unshift( config.dgeni.components.templateFolder );
  templateFinder.templatePatterns.unshift( config.dgeni.components.templatePattern );
  writeFilesProcessor.outputFolder = config.dgeni.components.outputFolder;
});
