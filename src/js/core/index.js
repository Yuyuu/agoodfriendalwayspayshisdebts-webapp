"use strict";

var angular = require("angular");

/*
 * This is required to load the default bootstrap templates.
 * The module cannot depend on angular-strap & angular-bootstrap because of name concurrency.
 */
var angularStrapModuleName = require("angular-strap");
require("angular-strap-templates");
var angularBootstrapModuleName = require("angular-bootstrap");

var coreModule = angular.module("app.core", [
  require("angular-sanitize"),
  require("angular-animate"),
  require("angular-message-format"),
  require("angular-cookies"),

  require("angular-ui-router"),
  require("ng-i18next"),
  require("ngInfiniteScroll"),
  require("angular-loading-bar"),
  require("angular-ui-notification"),
  require("angular-masonry"),
  require("angular-bootstrap-switch"),
  angularStrap("select"),
  angularStrap("affix"),
  angularBootstrap("modal"),
  angularBootstrap("tpls")
]);

function angularStrap(moduleName) {
  return angularStrapModuleName + "." + moduleName;
}

function angularBootstrap(moduleName) {
  return angularBootstrapModuleName + "." + moduleName;
}

module.exports = coreModule.name;