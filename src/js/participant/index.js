"use strict";

var angular = require("angular");
var configureModuleRouting = require("./module_routing");

var participantModule = angular.module("app.event.participant", []);

participantModule
  .directive("debtsAvatar", require("./directive/avatar_directive"));

configureModuleRouting();

module.exports = participantModule.name;