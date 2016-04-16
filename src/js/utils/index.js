"use strict";

var angular = require("angular");

var utilModule = angular.module("app.utils", [require("../core")]);

utilModule
  .service("restService", require("./service/rest_service"))
  .directive("currencyValidation", require("./directive/currency_validation_directive"))
  .directive("affixPanel", require("./directive/affix_panel_directive"))
  .directive("debtsInlineData", require("./directive/inline_data_directive"))
  .filter("debtsTime", require("./filter/time_filter"));

module.exports = utilModule.name;