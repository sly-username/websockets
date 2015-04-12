/*jshint strict: false*/
// jscs:disable requirePaddingNewLinesInObjects
import promisedDB from "domain/lib/storage/PromisedDB/promisedDB";
import edProfileDB from "domain/ed/storage/db/ed-profile-db";
import edTrackDB from "domain/ed/storage/db/ed-track-db";

var dataService = {};

// TODO REMOVE
edProfileDB.then( db => dataService.profileDB = db );
edTrackDB.then( db => dataService.trackDB = db );

// TODO REMOVE DEBUG
window.promisedDB = promisedDB;
window.edDataService = dataService;

export default dataService;
