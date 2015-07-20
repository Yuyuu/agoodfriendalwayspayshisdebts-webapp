"use strict";

var angular = require("angular");
var configureAppRouting = require("./app_routing");

angular.module("app", [
  require("angular-sanitize"),
  require("angular-route"),
  require("angular-loading-bar"),
  require("./ajax"),
  require("./translation"),
  require("./event")
]);

configureAppRouting();