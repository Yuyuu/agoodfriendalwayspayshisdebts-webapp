"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var resultModule = angular.module("app.event.result", [require("./reminder")]);

resultModule
  .factory("Results", require("./resource/results_resource"))
  .controller("ResultDetailsController", require("./controller/result_details_controller"))
  .directive("debtsVisualIndicator", require("./directive/visual_indicator_directive"));

configureModuleRouting();

module.exports = resultModule.name;