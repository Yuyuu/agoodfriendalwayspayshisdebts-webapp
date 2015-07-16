"use strict";

module.exports = {
  unit: {
    src: ["src/js/**/*.spec.js"],
    options: {
      reporter: ["spec"]
    }
  },
  watch: {
    src: ["src/js/**/*.spec.js"],
    options: {
      reporter: ["dot"]
    }
  }
};