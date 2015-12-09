"use strict";

module.exports = function (grunt) {
  var config = {
    pkg: grunt.file.readJSON("package.json"),
    prod: grunt.option("prod") || false,
    buildDir: "server/public/genere"
  };

  grunt.util._.extend(config, loadConfig("./grunt_tasks/options/"));
  grunt.initConfig(config);

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadTasks("grunt_tasks");

  grunt.registerTask("test", ["jshint", "mochaTest:unit"]);
  grunt.registerTask("tdd", ["clean", "dev"]);
  grunt.registerTask("buildApp", ["clean", "assets"]);
  grunt.registerTask("default", ["clean", "jshint", "mochaTest:unit"]);
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