"use strict";

var angular = require("angular");

/* This is required to load the default bootstrap templates */
require("angular-strap");
require("angular-strap-templates");
require("angular-bootstrap");

angular.module("app", [
  require("angular-sanitize"),
  require("angular-ui-router"),
  require("angular-animate"),
  require("angular-loading-bar"),
  require("angular-message-format"),
  require("./ajax"),
  require("./translation"),
  require("./event"),
  require("./utils"),
  require("./error")
])
  .run(run);

/* @ngInject */
function run(bootstrapService) {
  bootstrapService.start();
}