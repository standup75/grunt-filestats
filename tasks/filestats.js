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
      details: true
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
        var matches = filepath.match(/\.[^\/]*$/);
        var extension = matches ? matches[0] : 'Unknown file type'
        var fileType = fileTypes[extension];
        if (!fileType) {
          fileType = fileTypes[extension] = {
            count: 0,
            lineCount: 0
          };
        }
        fileCount++;
        fileType.count++;
        if (options.details) {
          var lines = grunt.file.read(filepath).split('\n');
          fileType.lineCount += lines.length;
          fileType.longestLine = Math.max.apply(this, lines.map(function(lines){ return lines.length; }));
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
        grunt.log.writeln('Number of ' + extension + ' files: ' + fileTypes[extension].count);
        if (options.details) {
          grunt.log.writeln('Number of lines in ' + extension + ' files: ' + fileTypes[extension].lineCount);
          grunt.log.writeln('Longest line in ' + extension + ' files: ' + fileTypes[extension].longestLine);
        }
      }
    }
  });
};