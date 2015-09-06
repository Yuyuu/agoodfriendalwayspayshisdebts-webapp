"use strict";

var angular = require("angular");

angular.module("app", [
  require("angular-sanitize"),
  require("ui.router"),
  require("angular-animate"),
  require("angular-loading-bar"),
  require("angular-message-format"),
  require("./ajax"),
  require("./translation"),
  require("./event"),
  require("./util"),
  require("./error")
]);