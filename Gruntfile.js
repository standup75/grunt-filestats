/*
 * grunt-filestats
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 Stanislas Duprey
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    filestats: {
      options: {
        details: true,
        extensionCanContainDots: false
      },
      javascript: {
        src: ['test/**/*.js']
      },
      all: {
        src: ['test/**']
      },
      nodetails: {
        options: {
          details: false
        },
        src: ['test/**']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/filestats_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');
};