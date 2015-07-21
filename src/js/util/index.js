"use strict";

var angular = require("angular");

var utilModule = angular.module("util", []);

utilModule
  .directive("currencyValidation", require("./directive/currency_validation_directive"));

module.exports = utilModule.name;