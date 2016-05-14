"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var activityModule = angular.module("app.event.activity", []);

activityModule
  .factory("Activity", require("./resource/activity_resource"))
  .controller("ActivityController", require("./controller/activity_controller"))
  .directive("debtsOperation", require("./directive/operation_directive"));

configureModuleRouting();

module.exports = activityModule.name;