const express = require('express');
const fs = require('fs');
const app = express();
var writable = fs.createWriteStream('lorem.txt');
var readable = fs.createReadStream('lorem.txt');
var zlib = require("zlib");

readable.on('data', function(chunk){
    writable.write(chunk);
});

readable.on('end', function(chunk){
    console.log("completed stream");
    writable.end();
});

readable.pipe(writable);

var gzip = zlib.createGzip();
var compressed = fs.createWriteStream('big_lorem.txt.gz');

readable.pipe(gzip).pipe(compressed);