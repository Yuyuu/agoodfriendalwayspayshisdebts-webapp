"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var resultModule = angular.module("result", []);

resultModule
  .factory("Results", require("./resource/results_resource"))
  .controller("ResultDetailsController", require("./controller/result_details_controller"));

configureModuleRouting();

module.exports = resultModule.name;