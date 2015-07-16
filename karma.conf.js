"use strict";

module.exports = function (config) {
  config.set({
    basePath: "./",
    frameworks: ["mocha", "sinon", "chai-sinon", "chai-as-promised", "chai"],
    files: [
      "./src/js/**/*.js"
    ],
    reporters: ["progress"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ["PhantomJS"],
    singleRun: false
  });
};