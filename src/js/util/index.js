"use strict";

var angular = require("angular");

var ngStrapAffixModule = require("angular-strap") + ".affix";

var utilModule = angular.module("app.util", [ngStrapAffixModule]);

utilModule
  .directive("currencyValidation", require("./directive/currency_validation_directive"))
  .directive("affixPanel", require("./directive/affix_panel_directive"))
  .directive("debtsInlineData", require("./directive/inline_data_directive"));

module.exports = utilModule.name;