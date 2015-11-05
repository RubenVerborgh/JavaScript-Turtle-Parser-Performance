#!/usr/bin/env node
var rdflib = require('rdflib');
var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    zlib = require('zlib');

if (process.argv.length !== 3)
  return console.error('Usage: N3Parser-perf.js filename');

var filename = path.resolve(process.cwd(), process.argv[2]),
    base = 'file://' + filename;

var TEST = '- Parsing file ' + filename;
console.time(TEST);

var count = 0;
var stream = fs.createReadStream(filename);
if (/\.gz$/.test(filename))
  stream = stream.pipe(zlib.createGunzip());

var store = {
  count: 0,
  setPrefixForURI: function () { },
  sym: function (uri) {
    return { uri: uri };
  },
  literal: function (value)  {
    return { value: value };
  },
  formula: function () {
    return {
      add: function () { store.count++; },
    };
  },
};
var parser = new rdflib.N3Parser(store, null, 'http://dbpedia.org/', 'http://dbpedia.org/');

var buffer = '';
stream.on('data', function (data) { buffer += data.toString(); });
stream.on('end', function () {
  parser.loadBuf(buffer);
  console.timeEnd(TEST);
  console.log('* Triples parsed: ' + count);
  console.log('* Memory usage: ' + Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB');
});
