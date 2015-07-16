"use strict";

module.exports = function (grunt) {
  var config = {};

  grunt.util._.extend(config, loadConfig("./grunt/tasks/options/"));
  grunt.initConfig(config);

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadTasks("grunt/tasks");

  grunt.registerTask("test", ["jshint", "karma:unit"]);
  grunt.registerTask("tdd", ["karma:watch:start", "watch"]);
};

function loadConfig(path) {
  var glob = require("glob");
  var config = {};
  var key;

  glob.sync("*", {cwd: path}).forEach(function (option) {
    key = option.replace(/\.js$/, "");
    config[key] = require(path + option);
  });

  return config;
}