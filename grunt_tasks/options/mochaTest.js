"use strict";

module.exports = {
  unit: {
    src: ["src/js/**/*.spec.js"],
    options: {
      reporter: ["spec"],
      require: "./test/helper.js"
    }
  },
  watch: {
    src: ["src/js/**/*.spec.js"],
    options: {
      reporter: ["dot"],
      require: "./test/helper.js"
    }
  }
};