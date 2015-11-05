#!/usr/bin/env node
var N3 = require('n3');
var fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    zlib = require('zlib');

if (process.argv.length !== 3)
  return console.error('Usage: n3-perf.js filename');

var filename = path.resolve(process.cwd(), process.argv[2]),
    base = 'file://' + filename;

var TEST = '- Parsing file ' + filename;
console.time(TEST);

var count = 0;
var stream = fs.createReadStream(filename);
if (/\.gz$/.test(filename))
  stream = stream.pipe(zlib.createGunzip());

new N3.Parser({ documentIRI: base }).parse(stream, function (error, triple) {
  assert(!error, error);
  if (triple)
    count++;
  else {
    console.timeEnd(TEST);
    console.log('* Triples parsed: ' + count);
    console.log('* Memory usage: ' + Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB');
  }
});
