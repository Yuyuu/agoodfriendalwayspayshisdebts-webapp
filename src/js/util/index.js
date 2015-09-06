"use strict";

var angular = require("angular");

var ngStrapAffixModule = require("angular-strap") + ".affix";
var ngStrapModalModule = require("angular-strap") + ".modal";

var utilModule = angular.module("app.util", [ngStrapAffixModule, ngStrapModalModule]);

utilModule
  .service("modalService", require("./service/modal_service"))
  .directive("currencyValidation", require("./directive/currency_validation_directive"))
  .directive("affixPanel", require("./directive/affix_panel_directive"))
  .directive("debtsInlineData", require("./directive/inline_data_directive"));

module.exports = utilModule.name;