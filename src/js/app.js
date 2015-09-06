"use strict";

var angular = require("angular");

/* This is required to load the default angular-strap templates */
require("angular-strap");
require("angular-strap-templates");

angular.module("app", [
  require("angular-sanitize"),
  require("angular-ui-router"),
  require("angular-animate"),
  require("angular-loading-bar"),
  require("angular-message-format"),
  require("./ajax"),
  require("./translation"),
  require("./event"),
  require("./util"),
  require("./error")
]);