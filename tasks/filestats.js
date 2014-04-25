/*
 * grunt-filestats
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Stanislas Duprey
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-filestats/blob/master/LICENSE-MIT
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.registerMultiTask('filestats', 'Gives you statistical information about your files by type.', function() {
    var dirCount = 0;
    var fileCount = 0;
    var options = this.options({
      details: true,
      extensionCanContainDots: false
    });
    var files = this.filesSrc;
    var fileTypes = {};

    files.forEach(function(filepath) {
      if (!grunt.file.exists(filepath)) {
        grunt.log.writeln(filepath + ' file not found');
      }
      if (grunt.file.isDir(filepath)) {
        dirCount++;
      } else {
        var matches = filepath.match(options.extensionCanContainDots ? /\.[^\/]*$/ : /\.[^\/\.]*$/);
        var extension = matches ? matches[0] : 'Unknown file type'
        var fileType = fileTypes[extension];
        if (!fileType) {
          fileType = fileTypes[extension] = {
            count: 0,
            lineCount: 0,
            longestLineLength: 0
          };
        }
        fileCount++;
        fileType.count++;
        if (options.details) {
          var lines = grunt.file.read(filepath).split('\n');
          var lineNumber = 0;
          var longestLineLength = Math.max.apply(this, lines.map(function(lines){
            lineNumber++;
            return lines.length;
          }));
          fileType.lineCount += lines.length;
          var max = Math.max(fileType.longestLineLength, longestLineLength);
          if (max === longestLineLength) {
            fileType.longestLineLength = longestLineLength;
            fileType.longestLineNumber = lineNumber;
            fileType.longestLineFile = filepath;
          }
        }
      }
    });
    grunt.log.writeln('Number of files scanned: ' + fileCount);
    grunt.log.writeln('Number of directories scanned: ' + dirCount);
    for (var extension in fileTypes) {
      if (fileTypes.hasOwnProperty(extension)) {
        if (options.details) {
          grunt.log.writeln('');
        }
        var fileType = fileTypes[extension];
        grunt.log.writeln('Number of ' + extension + ' files: ' + fileType.count);
        if (options.details) {
          grunt.log.writeln('Number of lines in ' + extension + ' files: ' + fileType.lineCount);
          grunt.log.writeln('Longest line in ' + extension + ' files: ' + fileType.longestLineLength);
          grunt.log.writeln('     in ' + fileType.longestLineFile + ' l:' + fileType.longestLineNumber);
        }
      }
    }
  });
};