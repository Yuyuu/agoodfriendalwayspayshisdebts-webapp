"use strict";

module.exports = {
  karma: {
    files: ["src/js/**/*.js"],
    tasks: ["jshint", "karma:watch:run"]
  }
};