"use strict";

var angular = require("angular");

var ajaxModule = angular.module("ajax", []);

ajaxModule
  .directive("elementValidation", require("./directive/element_validation_directive"));

module.exports = ajaxModule.name;