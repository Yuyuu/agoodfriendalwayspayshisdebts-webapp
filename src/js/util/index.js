"use strict";

var angular = require("angular");

var utilModule = angular.module("util", []);

utilModule
  .directive("currencyValidation", require("./directive/currency_validation_directive"))
  .directive("affixElement", require("./directive/affix_element_directive"));

module.exports = utilModule.name;