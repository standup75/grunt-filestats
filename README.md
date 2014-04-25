# grunt-filestats

> Gives you statistical information about your files by type.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-filestats --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-filestats');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-filestats/tree/grunt-0.3-stable).*



## filestats task
_Run this task with the `grunt filestats` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### processContent
Type: `Function(content, srcpath)`

This option is passed to `grunt.file.copy` as an advanced way to control the file contents that are copied.

#### processContentExclude
Type: `String`

This option is passed to `grunt.file.copy` as an advanced way to control which file contents are processed.

### Usage Examples

```js
filestats: {
  options: {
    details: true,
  },
  javascript: {
    src: ['src/**/*.js']
  },
  all: {
    src: ['src/**']
  }
}
```

### Demo

Just try `grunt filestats` in the root directory of this plugin

output:

```
Running "filestats:javascript" (filestats) task
Number of files scanned: 2
Number of directories scanned: 0

Number of .js files: 2
Number of lines in .js files: 3
Longest line in .js files: 21
     in test/folder_one/one.js l:1

Running "filestats:all" (filestats) task
Number of files scanned: 3
Number of directories scanned: 2

Number of .js files: 2
Number of lines in .js files: 3
Longest line in .js files: 21
     in test/folder_one/one.js l:1

Number of .txt files: 1
Number of lines in .txt files: 3
Longest line in .txt files: 50
     in test/folder_one/two.txt l:3

Running "filestats:nodetails" (filestats) task
Number of files scanned: 3
Number of directories scanned: 2
Number of .js files: 2
Number of .txt files: 1

Done, without errors.
```
