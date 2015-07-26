"use strict";

var angular = require("angular");
var configureAppRouting = require("./app_routing");

angular.module("app", [
  require("angular-sanitize"),
  require("angular-route"),
  require("angular-animate"),
  require("angular-loading-bar"),
  require("angular-strap"),
  require("./ajax"),
  require("./translation"),
  require("./event"),
  require("./result"),
  require("./util")
]);

configureAppRouting();