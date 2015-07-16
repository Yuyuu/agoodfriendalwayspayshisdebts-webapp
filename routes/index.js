"use strict";

var homeRoute = require("./home");
var templatesRoute = require("./templates");

module.exports = function (app) {
  app.get("/", homeRoute.index);
  app.get(/^\/templates\/(.*)$/, templatesRoute.serve);
};