"use strict";

var angular = require("angular");
var configureAppRouting = require("./app_routing");

angular.module("app", [
  require("angular-route"),
  require("angular-loading-bar"),
  require("./event")
]);

configureAppRouting();