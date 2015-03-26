var request = indexedDB.open("edDatabase");

request.onupgradeneeded = function() {
// If the database doesn't previously exist, create object store(s) and indexes.
  var db = request.result;
  var store = db.createObjectStore("edDatabase", {keyPath: "id"});
  var edItemIndex = store.createIndex("by_item", "name", {unique: true});

// how to populate data...are we seeding data from somewhere?
  store.put({name: "edDataObject1", id: 123456});
};

request.onsuccess = function() {
  db = request.result;
};

var tx = db.transaction("edDatabase", "readwrite");
var store = tx.objectStore("books");

store.put({title: "Quarry Memories", author: "Fred", isbn: 123456});
store.put({title: "Water Buffaloes", author: "Fred", isbn: 234567});
store.put({title: "Bedrock Nights", author: "Barney", isbn: 345678});

tx.oncomplete = function() {
  // All requests have succeeded and the transaction has committed.
};
The following example looks up a single book in the database by title using an index.

  var tx = db.transaction("books", "readonly");
var store = tx.objectStore("books");
var index = store.index("by_title");

var request = index.get("Bedrock Nights");
request.onsuccess = function() {
  var matching = request.result;
  if (matching !== undefined) {
    // A match was found.
    report(matching.isbn, matching.title, matching.author);
  } else {
    // No match was found.
    report(null);
  }
};
The following example looks up all books in the database by author using an index and a cursor.

  var tx = db.transaction("books", "readonly");
var store = tx.objectStore("books");
var index = store.index("by_author");

var request = index.openCursor(IDBKeyRange.only("Fred"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    report(cursor.value.isbn, cursor.value.title, cursor.value.author);
    cursor.continue();
  } else {
    // No more matching records.
    report(null);
  }
};
The following example shows how errors could be handled when a request fails.

  var tx = db.transaction("books", "readwrite");
var store = tx.objectStore("books");
var request = store.put({title: "Water Buffaloes", author: "Slate", isbn: 987654});
request.onerror = function() {
  // The uniqueness constraint of the "by_title" index failed.
  report(request.error);
  // Could call request.preventDefault() to prevent the transaction from aborting.
};
tx.onabort = function() {
  // Otherwise the transaction will automatically abort due the failed request.
  report(tx.error);
};
The database connection may be closed when it is no longer needed.

  db.close();
In the future, the database may have grown to contain other object stores and indexes. The following example shows one way to handle opening an older version of the database.

  var request = indexedDB.open("library", 3); // Request version 3.

request.onupgradeneeded = function(event) {
  var db = request.result;
  if (event.oldVersion < 1) {
    // Version 1 is the first version of the database.
    var store = db.createObjectStore("books", {keyPath: "isbn"});
    var titleIndex = store.createIndex("by_title", "title", {unique: true});
    var authorIndex = store.createIndex("by_author", "author");
  }
  if (event.oldVersion < 2) {
    // Version 2 introduces a new index of books by year.
    var bookStore = request.transaction.objectStore("books");
    var yearIndex = bookStore.createIndex("by_year", "year");
  }
  if (event.oldVersion < 3) {
    // Version 3 introduces a new object store for magazines with two indexes.
    var magazines = db.createObjectStore("magazines");
    var publisherIndex = magazines.createIndex("by_publisher", "publisher");
    var frequencyIndex = magazines.createIndex("by_frequency", "frequency");
  }
};

request.onsuccess = function() {
  db = request.result; // db.version will be 3.
};
